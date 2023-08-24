import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserEntity1692728011733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user" (
          "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
          "created_date" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_date" TIMESTAMP NOT NULL DEFAULT now(),
          "name" character varying,
          "role" character varying DEFAULT 'pending'
        )
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
