import { Authorities } from '@ehpr/common';
import { UserEntity } from 'src/user/entity/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const AUTHORITIES = [
  {
    name: 'Vancouver Island Health Authority',
  },
  {
    name: 'Vancouver Coastal Health Authority',
  },
  {
    name: 'Fraser Health Authority',
  },
  {
    name: 'Interior Health Authority',
  },
  {
    name: 'Northern Health Authority',
  },
  {
    name: 'Provincial Health Services Authority',
  },
  {
    name: 'Providence Health Care Society',
  },
  {
    name: 'First Nations Health Authority',
  },
];

export class AddHaTableAndHaIdFKToUserTable1708532257590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "health_authorities" (
            "id" SERIAL PRIMARY KEY,
            "name" character varying NOT NULL
        )
    `);

    AUTHORITIES.forEach(async a => {
      await queryRunner.query(`INSERT INTO "health_authorities" (name) VALUES ('${a.name}')`);
    });

    await queryRunner.query(`
        ALTER TABLE "user"
        ADD COLUMN "ha_id" integer,
        ADD CONSTRAINT "fk_ha_id"
            FOREIGN KEY ("ha_id")
            REFERENCES "health_authorities"("id")
                ON DELETE NO ACTION
                ON UPDATE NO ACTION;
    `);

    const users = await queryRunner.query(`SELECT * FROM "user"`);

    // loop through existing users and set HA
    users.forEach(async ({ id, email }: UserEntity) => {
      if (email) {
        const domain = email.split('@')[1];
        const ha = Object.values(Authorities).find(a => a.domains.includes(domain));
        if (ha) {
          await queryRunner.query(
            `UPDATE "user" 
           SET ha_id = (SELECT id FROM "health_authorities" WHERE name = '${ha.name}') 
           WHERE id = '${id}'`,
          );
        }
      }
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "health_authorities"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN ha_id`);
  }
}
