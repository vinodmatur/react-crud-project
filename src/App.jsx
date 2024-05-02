import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import MainLayout from './Layouts/MainLayout'
import JobsPage from './Pages/JobsPage'
import JobPage, {jobLoader} from './Pages/JobPage'
import NotFoundPage from './Pages/NotFoundPage'
import AddJobPage from './Pages/AddJobPage'
import EditJobPage from './Pages/EditJobPage'

 

const App = () => {
    //Add new job
  const addJob = async(newJob) => {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob)
      })
      return;
    }
  //Delete job
  const deleteJob = async(id) => {
    console.log('Delete id', id)
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    })
    return
  }

  //Update Job
  const updateJob = async(job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    })
    return
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/jobs' element={<JobsPage />} />
      <Route path='/add-job' element={<AddJobPage addSubmitJob={addJob}/>} />
      <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob} />} loader = {jobLoader}/>
      <Route path='/edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob} />} loader = {jobLoader}/>
      <Route path='*' element={<NotFoundPage />} />
    </Route>

    )
  );
  return <RouterProvider router={router} />
}

export default App
