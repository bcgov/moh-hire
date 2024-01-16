import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Template } from '@ehpr/common';
import { faker } from '@faker-js/faker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { TemplateEditor } from './TemplateEditor';

const data = [...Array(100)].map(() => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
  user: {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  },
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
}));

const columnHelper = createColumnHelper<Template>();
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue().split('-')[0],
  }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => info.getValue(),
  }),
  // columnHelper.accessor('content', {
  //   header: 'Content',
  //   cell: info => info.getValue(),
  // }),
  columnHelper.accessor('user', {
    header: 'User',
    cell: info => info.getValue().name,
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Last Updated',
    cell: info => dayjs(info.getValue()).format('YYYY-MM-DD HH:mm'),
  }),
];

export const TemplateTable = () => {
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState<Template>();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const edit = (row: Template) => {
    console.log(row);
    setTemplate(row);
    setOpen(true);
  };

  const onClose = () => {
    setTemplate(undefined);
    setOpen(false);
  };

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='border-t-2 border-b-2 border-bcLightGray'>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='p-2'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
              <th>Action</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, index) => (
                <td key={cell.id} className={'p-2 ' + (index % 2 === 1 ? '' : 'bcLightBlue')}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className='text-center'>
                <FontAwesomeIcon
                  className='h-6 mr-2'
                  icon={faEdit}
                  onClick={() => edit(row.original)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {template && <TemplateEditor open={open} onClose={onClose} template={template} />}
    </div>
  );
};
