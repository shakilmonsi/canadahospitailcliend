import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    const url = `https://canadahospitailserver-9p7l5gdfk-shakilmonsi.vercel.app/bookings?email=${user?.email}`;

    const { data: bookings = [],isLoading } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                   authorization: `bearer ${localStorage.getItem('accessToken')}` 
                }
            });
            const data = await res.json();
            return data;
        }
    })
if(isLoading){
    return <Loading></Loading>
}
    return (
        <div>
            <h3 className="text-3xl mb-5">My Appointments</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>price</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings &&
                            bookings?.map((booking, i) => <tr key={booking._id}>
                                <th>{i+1}</th>
                                <td>{booking.patient}</td>
                                <td>{booking.treatment}</td>
                                <td>{booking.appointmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>{
                                  booking.price && !booking.paid && <Link to={`/dashboard/payment/${booking._id}`}>
                                  <button 
                                  className='btn btn-primary'>pay</button></Link>  
                                   
                                
                                   }

{
    booking.price && booking.paid && <span className='text-primary'>paid</span>
}


                                   
                                   </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;