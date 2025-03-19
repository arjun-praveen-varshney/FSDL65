import { useRef, useEffect, useState } from 'react';

export default function Projects({ projects }) {
  const [localProjects, setLocalProjects] = useState(projects);
  const inputRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    // Focus on input when component mounts
    inputRef.current?.focus();
  }, []);

  const addProject = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      name: e.target.projectName.value,
      progress: 0,
    };
    setLocalProjects([...localProjects, newProject]);
    e.target.reset();
    inputRef.current?.focus();
  };

  const updateProgress = (id, increment) => {
    setLocalProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === id
          ? { ...project, progress: Math.min(100, project.progress + increment) }
          : project
      )
    );
  };

  return (
    <div className="container">
      <h2>Lab Projects</h2>
      
      <form onSubmit={addProject} className="project-form">
        <input
          ref={inputRef}
          name="projectName"
          placeholder="New project name"
          required
          className="input-field"
        />
        <button type="submit" className="btn">Add Project</button>
      </form>

      <div className="project-grid">
        {localProjects.map((project, index) => (
          <div
            key={project.id}
            ref={el => projectRefs.current[index] = el}
            className="project-card"
          >
            <h3>{project.name}</h3>
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${project.progress}%` }}
              >
                {project.progress}%
              </div>
            </div>
            <div className="button-group">
              <button 
                onClick={() => updateProgress(project.id, 10)}
                className="btn progress-btn"
              >
                +10%
              </button>
              <button 
                onClick={() => updateProgress(project.id, -10)}
                className="btn progress-btn"
              >
                -10%
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}