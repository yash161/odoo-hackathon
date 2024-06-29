import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
function Signup() {

  const router = useRouter()

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    employee_id:"",
    department:"",
    designation:""
  });

  const [btnDisabled, setBtndisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true)
      await axios.post('/api/users/signup',user)
      router.push('/login')
      
    } catch (error:any) {
      console.log(error.message);
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    if( user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0) {
        setBtndisabled(false);
      }
      else{
        setBtndisabled(true);
      }
  },[user])

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col  justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {loading ? "Processing" : "Sign in to your account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-3" >
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="mt-2">
              <Input id="username" placeholder="username" type="text" 
              onChange={(e) => setUser({...user,username:e.target.value})}
              className="rounded-lg border-2 border-rose-600"
              />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-2">
              <Input id="email" placeholder="email" type="email" 
              onChange={(e) => setUser({...user,email:e.target.value})}
              className="rounded-lg border-2 border-rose-600"
              />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-2">
              <Input id="password" placeholder="password" type="password" 
              onChange={(e) => setUser({...user,password:e.target.value})}
              className="rounded-lg border-2 border-rose-600"
              />
              </div>
            </div>
            <div>
              <Label htmlFor="employeeId">Employee Id</Label>
              <div className="mt-2">
              <Input id="employeeId" placeholder="eg. 12349" type="text" 
              onChange={(e) => setUser({...user,employee_id:e.target.value})}
              className="rounded-lg border-2 border-rose-600"
              />
              </div>
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <div className="mt-2">
              <Input id="department" placeholder="eg. HR" type="text" 
              onChange={(e) => setUser({...user,department:e.target.value})}
              className="rounded-lg border-2 border-rose-600"
              />
              </div>
            </div>
            <div>
              <Label htmlFor="designation">Designation</Label>
              <div className="mt-2">
              <Input id="designation" placeholder="eg. developer" type="text" 
              onChange={(e) => setUser({...user,designation:e.target.value})}
              className="rounded-lg border-2 border-rose-600"
              />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSignup}
                className={`bg-blue-500 w-full text-white font-bold py-2 px-4 rounded opacity-50  ${btnDisabled ? "cursor-not-allowed" :"opacity-100"}`}
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Registered?{' '}
            <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Click Here
            </Link>
            <Link className="font-medium text-indigo-600 hover:text-green-500 flex flex-col" href='/'>
              Go Back
          </Link>
          </p>

        </div>

      </div>
    </>
  )
}

export default Signup