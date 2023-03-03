import React from 'react'
type ButtonProps = {
    children: React.ReactNode
    handlerClick?: () => void
    action?: "Delete" | "Edit" | "Publish" | "View"
}
const Button = ({ children, handlerClick, action }: ButtonProps) => {
    return (
        <button onClick={handlerClick} className={`text-xl text-white px-3 py-1 border drop-shadow-md rounded-md cursor-pointer ${action === "Delete" ? "bg-red-600" : action === "Edit" ? "bg-yellow-500" : action === "Publish" ? "bg-blue-700" : action === "View" && "bg-secondary"} w-full`}>{children}</button>
    )
}

export default Button