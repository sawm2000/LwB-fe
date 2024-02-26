import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getAllNotes } from "../../../api";
import NoteCard from "./NoteCard";
import "../../../css/notes.css"

function StudentNotes({ subjectToDisplay, yearsToDisplay, teachersToDisplay }) {
  const [allNotes, setAllNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const subject = searchParams.get("subject") || "";
  const teacher = searchParams.get("teacher") || "";
  const year = searchParams.get("year") || "";

  const newParams = new URLSearchParams(searchParams);
//console.log(teacherToDisplay)
  useEffect(() => {
      getAllNotes(subject, teacher, year)
        .then((response) => {
          setAllNotes(response);
          setIsLoading(false);
          setError("");
        })
        .catch((error) => {
          setError({error});
        });
    },
    [subject, teacher, year]
  );

  function handleYear(event) {
    newParams.set("year", event.target.value);
    setSearchParams(newParams);
  }

  function handleSubject(event) {
    newParams.set("subject", event.target.value);
    setSearchParams(newParams);
  }

  function handleTeacher(event) {
    newParams.set("teacher", event.target.value);
    setSearchParams(newParams);
  }

  if (error) {
    return <p>{error}</p>;
  }

  

  return (
    <>
      {isLoading ? <p>Loading Notes ...</p> : null}
      <ul key="NotesList" className="note-list">
        <h2 className="all-notes-title">All Notes</h2>
        
        <>
        <div className="filter-container"><h4>Filter by:</h4>
        
          <div className="filter-options">
          <label htmlFor="subject"></label>
          <select
            className="drop-down"
            value={subject}
            onChange={handleSubject}
            required
          >
            <option value="">All subjects</option>
            {subjectToDisplay.map((subject, index) => (
              <option key={index} value={subject.subject}>
                {subject.subject}
              </option>
            ))}
          </select>
          <br></br>
          <label htmlFor="years"></label>
          <select
            required
            className="drop-down"
            value={year}
            onChange={handleYear}
          >
            <option value="">All Years</option>
            {yearsToDisplay.map((year, index) => (
              <option key={index} value={year.year}>
                {year.year}
              </option>
            ))}
          </select>
          <br></br>
          <select
            className="drop-down"
            value={teacher}
            onChange={handleTeacher}
            required
          >
            <option value="">All Teachers</option>
            {teachersToDisplay.map((teacher, index) => (
              <option key={index} value={teacher.userName}>
                {teacher.userName}
              </option>
            ))}
          </select>
          <br></br>
          </div>
          </div> 
        </>

        {allNotes.length === 0 ? (
          <p>Sorry no Notes available ....</p>
        ) : (
          allNotes.map((note) => {
            return (
              <>
                {/* <NoteCard
                  key={note.title}
                  note={note}
                  allNotes={allNotes}
                /> */}
                 <div key={note._id} className="note-preview">
              <Link to={`/student/home/notes/${note._id}`}>
                <img src={note.img_url} alt="Note Preview" />
                <h1>{note.title}</h1>
              </Link>
            </div>
              </>
            );
          })
        )}
      </ul>
    </>
  );
}

export default StudentNotes;
