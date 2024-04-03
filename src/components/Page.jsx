export default function Page ({title, children}) {
  return (
    <>
      <div className={'text-primary text-4xl text-center pt-4 mb-16 uppercase'}>{title}</div>
      <div className={'border border-gray-700 p-4 mx-auto max-w-[960px]'}>
        {children}
      </div>
    </>
  )
}
