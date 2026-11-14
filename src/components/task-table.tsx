import { tableFeatures, useTable, type ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

import type { TaskResponse, TaskStatus } from "tasknest-schemas";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { StatusDropdownMenu } from "./status-dropdown-menu";

interface Props {
  tasks: TaskResponse[]
  setTaskStatus: (id: number, status: TaskStatus) => void
  deleteTask: (id: number) => void
}

export function TaskTable({ tasks, setTaskStatus, deleteTask }: Props) {
  const features = tableFeatures({})

  const columns: Array<ColumnDef<typeof features, TaskResponse>> = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: (info) => info.getValue()
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        return (
          <StatusDropdownMenu
            taskId={info.row.original.id}
            currentStatus={info.row.original.status}
            onStatusChange={setTaskStatus}
          />
        )
      }
    },
    {
      id: 'actions',
      header: () => null,
      cell: (info) => (
        <Button
          variant='destructive'
          onClick={_e => deleteTask(info.row.original.id)}
        >
          <Trash />
          Delete
        </Button>
      )
    }
  ]

  const table = useTable({
    key: 'task-table',
    features,
    columns,
    data: tasks,
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                >
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
