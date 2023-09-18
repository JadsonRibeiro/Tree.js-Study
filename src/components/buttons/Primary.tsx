import React, { PropsWithChildren } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function ButtonPrimary({ children, ...props }: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type='button'
      className='mb-2 mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      {...props}
    >
      {children}
    </button>
  )
}
