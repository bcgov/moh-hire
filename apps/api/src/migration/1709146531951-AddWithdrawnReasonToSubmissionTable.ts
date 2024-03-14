import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddWithdrawnReasonToSubmissionTable1709146531951 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'submission',
      new TableColumn({
        name: 'withdrawn_reason',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('submission', 'withdrawn_reason');
  }
}
