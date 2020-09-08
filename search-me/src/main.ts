import { SearchMeModule } from './search-me/search-me.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(SearchMeModule);
  await app.listen(3000);
}
bootstrap();
