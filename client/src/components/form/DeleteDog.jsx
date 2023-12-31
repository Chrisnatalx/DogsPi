import React, { useState } from 'react'
import './Form.css'
import axios from 'axios'
export const DeleteDog = () => {
    const [id, setId] = useState('')


    const handlerChange = (e) => {
        setId(e.target.value)
    }
    const deleteDog = async (e) => {
        e.preventDefault();
        try {
            const dogId = id
            await axios.delete('http://localhost:3001/dogs', { data: { id: dogId } })
            alert('Perro eliminado exitosamente.');
        } catch (error) {
            console.error('Error al eliminar el perro:', error);
        }
        setId('')

    }

    const disabled = () => {
        let disabled
        if (id === '') {
            disabled = true;
        } else {
            disabled = false
        }
        return disabled
    }
    return (
        <div>
            <form action="" onSubmit={deleteDog} className='Form'>
                <input type="text" value={id} onChange={handlerChange} placeholder='Insert UUID for delete dog' />
                <button type='submit' disabled={disabled()}>Delete Dog</button>
            </form>

        </div>
    )
}
