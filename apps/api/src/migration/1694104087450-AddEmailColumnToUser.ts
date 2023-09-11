import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddEmailColumnToUser1694104087450 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        isNullable: true,
        isUnique: true,
      }),
    );
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'active',
        type: 'bool',
        default: false,
      }),
    );
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'revoked_date',
        type: 'timestamp',
        isNullable: true,
      }),
    );
    await queryRunner.query(`
      UPDATE "user" SET "active" = TRUE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'email');
  }
}
