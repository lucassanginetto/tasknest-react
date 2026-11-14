import axios from 'axios'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import z from 'zod'

import { zTaskResponse, type TaskCreationData, type TaskResponse, type TaskStatus } from 'tasknest-schemas'

import { NewTaskForm } from '@/components/new-task-form'
import { TaskTable } from '@/components/task-table'

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskResponse[]>([])
  const navigate = useNavigate()

  function getToken() {
    const token = localStorage.getItem('tasknest-token')
    if (!token) navigate('/login')
    return token
  }

  useEffect(() => {
    axios.get(`${process.env.BUN_PUBLIC_API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(response => {
        setTasks(z.array(zTaskResponse).parse(response.data))
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) navigate('/login')
        else {
          console.error({ error })
          alert('Failed to list tasks due to an unknown error')
        }
      })

  }, [])

  const addTask = (taskCreationData: TaskCreationData) => {
    axios.post(`${process.env.BUN_PUBLIC_API_URL}/tasks`, taskCreationData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(response => {
        setTasks([...tasks, zTaskResponse.parse(response.data)])
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) navigate('/login')
        else {
          console.error({ error })
          alert('Failed to add task due to an unknown error')
        }
      })
  }

  const setTaskStatus = (id: number, taskStatus: TaskStatus) => {
    axios.patch(`${process.env.BUN_PUBLIC_API_URL}/tasks/${id}`, {
      status: taskStatus
    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(response => {
        setTasks(tasks.map(value => value.id === id ? zTaskResponse.parse(response.data) : value))
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) navigate('/login')
        else {
          console.error({ error })
          alert('Failed to update task due to an unknown error')
        }
      })
  }

  const deleteTask = (id: number) => {
    axios.delete(`${process.env.BUN_PUBLIC_API_URL}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(_response => {
        setTasks(tasks.filter(value => value.id !== id))
      })
      .catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) navigate('/login')
        else {
          console.error({ error })
          alert('Failed to delete task due to an unknown error')
        }
      })
  }

  return (
    <div className="min-h-svh w-full items-center justify-between p-6 md:p-10">
      {<NewTaskForm addTask={addTask} className='pb-2' />}
      {tasks.length !== 0 && <TaskTable tasks={tasks} setTaskStatus={setTaskStatus} deleteTask={deleteTask} />}
    </div>
  )
}
