import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import {createLogEntry} from './API';

const LogEntryForm = ({ location, onClose }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { register, handleSubmit} = useForm();
    const onSubmit = async (data)=>{
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            console.log(created);
            onClose()
        } catch (error) {
            console.log(error);
            setError(error.message); 
            setLoading(false);
        }
    }; 
    return ( // htmlFor is used to avoid error in the console
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            { error ? <h3>{error}</h3> : null}
            <label htmlFor='title'>Titre</label> 
            <input name="title" required ref={register}/>
            <label htmlFor='comments'>Commentaire</label>
            <input name="comments" ref={register}/>
            <label htmlFor='description'>description</label>
            <input name="description" ref={register}/>
            <label htmlFor='rating'>note sur 10</label>
            <input name="rating" ref={register}/>
            <label htmlFor='image'>lien Image</label>
            <input name="image" ref={register}/>
            <label htmlFor='visitDate'>date de visite</label>
            <input name="visitDate" type="date" required ref={register}/>
            <button disabled={loading}>{loading ? 'enregistrement...' : 'Creer votre souvenir'}</button>
        </form>
    )
};

export default LogEntryForm; 