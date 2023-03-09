import Link from 'next/link'
import React from 'react'
import { Auth, Hub } from 'aws-amplify'
import { useState , useEffect} from 'react'
 


export const NavBar = () => {
    const [singedUser, setSinedUser] = useState(false);

    useEffect(() => {
      authListener()
    }, [])
    

    const authListener  = async ()=>{
      Hub.listen("auth", (data)=>{
        switch (data.payload.event) {
            case 'signIn':   
            return setSinedUser(true)  
                break;
            case 'signOut': 
            return setSinedUser(false)      
                break;
            default:
                break;
        }

      })
      try {
        await Auth.currentAuthenticatedUser();
        setSinedUser(true)
      } catch (err) {
        
      }
    }

  return (
    <>
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
        
            <img src="https://daisy.org/wp-content/uploads/2020/07/apple-books-app-icon.png" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Books App</span>
        
        <div className="flex items-center">
            {/* <a href="tel:5541251234" className="mr-6 text-sm font-medium text-gray-500 dark:text-white hover:underline">(555) 412-1234</a>
             */}
            
            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Login</a>
        </div>
    </div>
</nav>
<nav className="bg-gray-50 dark:bg-gray-700">
    <div className="max-w-screen-xl px-4 py-3 mx-auto md:px-6">
        <div className="flex items-center">
            <ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
                {
                    [
                        ['Home' , '/'],
                        ['Add Book' , '/create-post'],
                        ['Profile' ,'/profile']
                    ].map(([title,url], index)=>(
                        <Link key={index} href={url} > {title}</Link>
                    ))
                }
                {
                    singedUser && (
                        <Link href={'/my-book'} > My Books
                      
                        </Link>
                    )
                }
              
                {/* <li>
                    <a href="#" className="text-gray-900 dark:text-white hover:underline">Features</a>
                </li> */}
            </ul>
        </div>
    </div>
</nav>
    </>
    


  )
}
