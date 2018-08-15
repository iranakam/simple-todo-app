import Axios from 'axios'

Axios.defaults.headers.common['X-CSRF-Token'] = document.getElementsByName('csrf-token')[0].content
Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`

Axios.setAuthorization = () => {
    Axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
}

export default Axios
