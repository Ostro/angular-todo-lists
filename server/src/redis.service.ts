import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  client: RedisClientType;
  async onModuleInit() {
    this.client = createClient();
    this.client.on('error', (error) => console.error(`Error : ${error}`));

    await this.client.connect();
  }
}
