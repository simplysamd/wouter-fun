import {useEffect} from 'react'
import PropTypes from 'prop-types'

export default function Button (props) {
  const {onClick, text, watchFor} = props

  useEffect(() => {
    if (watchFor) {
      const listener = ({key}) => {
        if (key === watchFor) onClick()
      }
      document.addEventListener('keyup', listener)
      return () => document.removeEventListener('keyup', listener)
    }
  }, [watchFor])

  return (
    <button
      className={'p-2 border border-transparent bg-teal-400 text-gray-900 hover:text-teal-400 hover:bg-transparent hover:border-teal-400'}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  watchFor: PropTypes.string
}
