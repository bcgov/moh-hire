import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMassEmailTable1707313673269 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "mass_email_record" (
            "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            "user_id" uuid NOT NULL,
            "recipients" jsonb NOT NULL,
            "errors" jsonb,
            "created_date" TIMESTAMP NOT NULL DEFAULT now(),
            FOREIGN KEY("user_id") REFERENCES "user"("id") ON DELETE CASCADE
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "mass_email_record"`);
  }
}
