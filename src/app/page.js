'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { auth } from './config/Config'
import Navbar from './components/Navbar'
import SubNavbar from './components/SubNavbar/page'
import { onAuthStateChanged } from 'firebase/auth'
import { db } from './config/Config'
import { doc, addDoc, getDoc, getDocs, collection, get } from "firebase/firestore";
import Article from './components/Article/page'


export default function Home() {
  let [userId, setUserId] = useState(null)
  let [userName, setUserName] = useState('')
  let [articleTitle, setArticleTitle] = useState('')
  let [articleDesc, setArticleDesc] = useState('')
  let [totalArticles, setTotalArticles] = useState([])
  let [currentUserArticles, setCurrentUserArticles] = useState([])
  let [readMoreOfThis, setReadMoreOfThis] = useState(false)
  let [publisherCollection, setPublisherCollection] = useState([])
  let [loader, setLoader] = useState(true)
  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        userId = user.uid

        setUserId(userId)
        console.log(userId, user)
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setUserName(docSnap.data().userName)
          const colRef = collection(db, `blog${userId}`);
          const docsSnap = await getDocs(colRef);
          docsSnap.forEach(doc => {
            console.log(doc.data());
            currentUserArticles.push(doc.data())
            setCurrentUserArticles([...currentUserArticles])
            setLoader(false)
          })



        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }
      else {

        console.log("no user")
        const colRef = collection(db, "users");
        const docsSnap = await getDocs(colRef);
        docsSnap.forEach(async (doc) => {
          console.log(doc.id);
          let newDocid = doc.id
          console.log(newDocid);
          // totalPublishers.push(doc.id)
          const colRef = collection(db, `blog${doc.id}`);
          const docsSnap = await getDocs(colRef);
          docsSnap.forEach(doc => {
            console.log(doc.data());
            let docData = doc.data()
            docData['id'] = newDocid
            console.log(newDocid)
            console.log(doc.id)
            console.log(docData)
            totalArticles.push(docData)
            setTotalArticles([...totalArticles])
            setLoader(false)
          })

        })
      }
    })
  }, [])
  console.log(totalArticles)
  return (
    <>
      {loader ? <div className='w-screen min-h-screen bg-blue-200  flex justify-center items-center'>
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span
          >
        </div>
      </div> :
        <>

          {readMoreOfThis ? <div className='w-screen min-h-screen p-10 overflow-x-hidden bg-white m-0 flex flex-col '>
            <button className="bg-blue-600 text-white w-[20%] ml-[70px] p-4 rounded-lg" onClick={() => setReadMoreOfThis(false)}>Back</button>
            
            {
              
              publisherCollection.map((value, index) => {
                console.log(value)
                
                let na = new Date(value.date.seconds * 1000)

                return (
                  <Article title={value.title} desc={value.desc} dateval={na.toLocaleString()} name={value.name} />
                )
              })

            }
            
          </div> :

            <><Navbar username={userName} userId={userId} />

              <SubNavbar path="Welcome Readers" />

              {userId ? <><div className='w-[60%] ml-[70px]  bg-blue-200 rounded-xl p-10'>
                <input className='p-[10px] outline-purple-900 rounded-lg w-[90%] m-2' value={articleTitle}
                  onChange={(e) => {
                    setArticleTitle(e.target.value)
                  }}
                ></input>
                <textarea className='w-[90%] outline-purple-900 h-20 rounded-lg m-2' minLength='100' maxLength='3000' value={articleDesc}
                  onChange={(e) => {
                    setArticleDesc(e.target.value)
                  }}
                />
                <button className='w-40 rounded-lg bg-purple-800  text-white p-5 m-2'
                  onClick={() => {
                    console.log(userId)
                    const dbRef = collection(db, `blog${userId}`);
                    let Date = new Date();
                    const data = {
                      title: articleTitle,
                      desc: articleDesc,
                      date: Date,
                      name: userName,
                    };
                    addDoc(dbRef, data)
                      .then(docRef => {
                        console.log("Document has been added successfully", docRef.id);
                        setArticleDesc('')
                        setArticleTitle('')
                        currentUserArticles.push(data)
                        setCurrentUserArticles([...currentUserArticles])
                      })
                      .catch(error => {
                        console.log(error);
                      })


                  }}
                >Publish Blog</button>


              </div>
                {currentUserArticles.map((value, index) => {

                  let na = new Date(value.date.seconds * 1000)

                  return (

                    <Article key={index} title={value.title} desc={value.desc} dateval={na.toLocaleString()} name={value.name} user={userName} />)

                })}


              </> : null}
              {totalArticles.map((value, index) => {
                let na = new Date(value.date.seconds * 1000)
                return (
                  <Article key={index} title={value.title} desc={value.desc} dateval={na.toLocaleString()} name={value.name}
                    readMoreOfThis={readMoreOfThis} setReadMoreOfThis={setReadMoreOfThis} publisherCollection={publisherCollection} setPublisherCollection={setPublisherCollection}
                    user={userName} publisherId={value.id} setLoader={setLoader}/>)
              })}</>}

        </>


      }










    </>
  )
}