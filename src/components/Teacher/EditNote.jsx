import React, { useState, useEffect } from 'react';
import { updateNote, getNoteById } from '../../../api';

function EditNote({ noteId }) {
    const [note, setNote] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedTeacher, setUpdatedTeacher] = useState('');
    const [updatedSubject, setUpdatedSubject] = useState('');
    const [updatedImg, setUpdatedImg] = useState('');
    const [updatedYear, setUpdatedYear] = useState('');
    const [updatedBody, setUpdatedBody] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch the note by its ID when the component mounts
        getNoteById(noteId)
            .then((noteData) => {
                setNote(noteData);
                setUpdatedTitle(noteData.title);
                setUpdatedTeacher(noteData.teacher);
                setUpdatedSubject(noteData.subject);
                setUpdatedImg(noteData.img_url || '');
                setUpdatedYear(noteData.year || '');
                setUpdatedBody(noteData.body);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsError(true);
                setIsLoading(false);
            });
    }, [noteId]);

    const handleTitleChange = (event) => {
        setUpdatedTitle(event.target.value);
    };

    const handleTeacherChange = (event) => {
        setUpdatedTeacher(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setUpdatedSubject(event.target.value);
    };

    const handleImgChange = (event) => {
        setUpdatedImg(event.target.value);
    };

    const handleYearChange = (event) => {
        setUpdatedYear(event.target.value);
    };

    const handleBodyChange = (event) => {
        setUpdatedBody(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Update the note with the new data
        updateNote(noteId, {
            title: updatedTitle,
            teacher: updatedTeacher,
            subject: updatedSubject,
            img_url: updatedImg,
            year: updatedYear,
            body: updatedBody
        })
            .then((updatedNote) => {
                setNote(updatedNote); // Update the state with the updated note
                alert('Note updated successfully!');
            })
            .catch((error) => {
                setIsError(true);
                alert('Failed to update note. Please try again.');
            });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !note) {
        return <p>Error: Failed to load note.</p>;
    }

    return (
        <div>
            <h1>Edit Note</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" value={updatedTitle} onChange={handleTitleChange} />

                <label htmlFor="teacher">Teacher:</label>
                <input type="text" id="teacher" value={updatedTeacher} onChange={handleTeacherChange} />

                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" value={updatedSubject} onChange={handleSubjectChange} />

                <label htmlFor="category">Image:</label>
                <input type="text" id="category" value={updatedImg} onChange={handleImgChange} />

                <label htmlFor="year">Year:</label>
                <input type="text" id="year" value={updatedYear} onChange={handleYearChange} />

                <label htmlFor="body">Body:</label>
                <textarea id="body" value={updatedBody} onChange={handleBodyChange} />

                <button type="submit">Update Note</button>
            </form>
        </div>
    );
}

export default EditNote;