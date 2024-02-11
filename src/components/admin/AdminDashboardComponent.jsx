import {Card} from 'react-bootstrap'

const AdminDashboardCard=(
    {
    icon,
    text,
    number
    }
)=>{
    return(
        <Card className='shadow text-center'>
        <Card.Body>
          {icon}
            <h4 className='mt-2'>( {number} )</h4>
            <h6>{text}</h6>
        </Card.Body>
    </Card>
    )
}

export default AdminDashboardCard