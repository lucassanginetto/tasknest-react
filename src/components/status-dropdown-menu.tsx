import { zTaskStatus, type TaskStatus } from "tasknest-schemas"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"

interface Props {
  taskId: number
  currentStatus: TaskStatus
  onStatusChange: (id: number, status: TaskStatus) => void
}

export function StatusDropdownMenu({ taskId, currentStatus, onStatusChange }: Props) {
  const statusSet = new Set<TaskStatus>(["TODO" as const, "IN_PROGRESS" as const, "COMPLETED" as const])

  function readableStringFromStatus(status: TaskStatus) {
    switch (status) {
      case "TODO":
        return "To-do"
      case "IN_PROGRESS":
        return "In progress"
      case "COMPLETED":
        return "Completed"
      default:
        const _exhaustiveCheck: never = status
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{readableStringFromStatus(currentStatus)}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Status</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={currentStatus} onValueChange={value => {
            onStatusChange(taskId, zTaskStatus.parse(value))
          }}>
            {
              Array.from(statusSet).map((status) => (
                <DropdownMenuRadioItem value={status}>{readableStringFromStatus(status)}</DropdownMenuRadioItem>
              ))
            }
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
