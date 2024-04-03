import PropTypes from 'prop-types'

export default function Input (props) {
  const {onKeyUp, autoFocus = false, id, placeholder} = props

  return (
    <input
      autoFocus={autoFocus}
      onKeyUp={onKeyUp}
      id={id}
      placeholder={placeholder}
      className={'indent-2 w-48 border border-teal-400 placeholder:text-slate-600 bg-gray-800'}
    />
  )
}

Input.propTypes = {
  onKeyUp: PropTypes.func,
  autoFocus: PropTypes.bool,
  id: PropTypes.string,
  placeholder: PropTypes.string
}
