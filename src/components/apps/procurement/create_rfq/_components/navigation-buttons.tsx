import Link from "next/link"

type NavigationButtonsProps = {
  back: string,
  next: string,
  home?: boolean
}

const NavigationButton = ({back, next, home=false}: NavigationButtonsProps) => {

  return (
    <div className='flex justify-between'>
      <Link href={back}>
        <p className={`btn btn-primary ${back === '-' ? 'hidden' : ''}`}>
          Back
        </p>
      </Link>
      <Link href={next}>
        <p className='btn btn-primary ltr:ml-auto rtl:mr-auto'>
          {home ? "Submit" : "Next"}
        </p>
      </Link>
    </div>
  )
}

export default NavigationButton