import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {
    const onClick = () => {
     console.log('clicked')   
    }
    return (
        <header className='header'>
            <h1>{ title }</h1>
            <Button bgColor='green' text='Add' onClick={onClick}/>
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}


export default Header

// CSS in jsx
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'pink'
// }