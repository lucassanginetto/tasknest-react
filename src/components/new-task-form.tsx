import { useState } from "react"

import type { TaskCreationData } from "tasknest-schemas"

import { cn } from "@/lib/utils"

import { Button } from "./ui/button"
import { Field, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

type Props = React.ComponentProps<"div"> & {
  addTask: (taskCreationData: TaskCreationData) => void
}

export function NewTaskForm({ className, addTask, ...props }: Props) {
  const [title, setTitle] = useState('')

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create new task</CardTitle>
          <CardDescription>
            Enter a title below to create a new task
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={e => {
            e.preventDefault()
            if (title === '') return
            addTask({ title, description: '', status: 'TODO' })
            setTitle('')
          }}>
            <Field>
              <FieldLabel htmlFor="title">New Task</FieldLabel>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                type='text'
                id='title'
              />
            </Field>
            <Field>
              <Button type="submit">Add</Button>
            </Field>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
