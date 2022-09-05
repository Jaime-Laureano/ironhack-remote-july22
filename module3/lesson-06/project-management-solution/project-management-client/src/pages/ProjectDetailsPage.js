import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
// import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";

const API_URL = "http://localhost:5005";
 
function ProjectDetailsPage (props) {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();            

  const getProject = () => {          //  <== ADD A NEW FUNCTION
    axios
      .get(`${API_URL}/api/projects/${projectId}`)
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=> {                   // <== ADD AN EFFECT
    getProject();
    // eslint-disable-next-line
  }, [] );
  
  return (
    <div className="ProjectDetails">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </>
      )}
      <AddTask refreshProject={getProject} projectId={projectId} />
 
      {project &&
        project.tasks.map((task) => (
          <TaskCard key={task._id} {...task} />
      ))}
 
      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>   
    </div>
  );
}
 
export default ProjectDetailsPage;