import { createNestApp } from './app.config';
import { DatabaseService } from './database/database.service';

async function bootstrap() {
  const { app } = await createNestApp();
  app.enableCors();
  await app.init();
  const dbService: DatabaseService = app.get(DatabaseService);
  await dbService.runMigrations();
  await app.listen(process.env.APP_PORT || 4000);
}
bootstrap();
