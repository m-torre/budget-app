import { useState } from "react"

const useModal = () => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
  
  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const getOpenStatus = () => {
    return open
  }

  const setTargetId = (id) => {
    setId(id)
  }

  const getTargetId = () => {
    return id
  }

  return {
    openModal,
    closeModal,
    getOpenStatus,
    setTargetId,
    getTargetId
  }
}

export default useModal