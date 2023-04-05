import React, {useEffect, useState} from 'react';
import Desk from '../layout/Desk';
import axios from 'axios';

const Todo = ({token}) => {
    const [desk, setDesk] = useState({id: 0, name: 'MAma'});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            axios({
                method: "GET",
                url: 'http://127.0.0.1:5001/desks',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    setDesk(response.data[0])
                    setIsLoading(false)
                })
        };
        fetchData();
    }, []);
    return (
        <div>
            {isLoading ?
                (<div>
                    Loading...
                </div>)
                :
                (<div>
                    <Desk token={token} desk={desk} setDesk={setDesk}/>
                </div>)
            }
        </div>
    );
};

export default Todo;