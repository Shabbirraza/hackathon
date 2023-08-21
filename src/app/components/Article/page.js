import React from 'react'
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/app/config/Config'


const Article = ({ currentUserArticles, setCurrentUserArticles, docId, currentUserId, setLoader, title, desc, dateval, name, user, currentUser, publisherId, readMoreOfThis, setReadMoreOfThis, publisherCollection, setPublisherCollection }) => {

    function handleClick() {
        let promptval = prompt("enter data")
        if (promptval) {
            if (promptval.length > 100 & promptval.length < 3000) {
                const docRef = doc(db, `blog${currentUserId}`, docId);
                const data = {
                    desc: promptval,
                };
                updateDoc(docRef, data)
                    .then(async (docRef) => {
                        console.log("A New Document Field has been added to an existing document");
                        const colRef = collection(db, `blog${currentUserId}`);
                        const docsSnap = await getDocs(colRef);
                        currentUserArticles = []
                        docsSnap.forEach(doc => {
                            console.log(doc.data());
                            currentUserArticles.push(doc.data())

                        })
                        setCurrentUserArticles([...currentUserArticles])



                    })
                    .catch(error => {
                        console.log(error);
                    })

            } else {
                alert('please enter title betweeen 5 to 50 letters and desc between 100 to 3000 letters')
            }

        }
    }

    return (
        <div className='w-[90%]  ml-[20px] md:ml-[70px] p-5 shadow-2xl  border-black rounded-xl mt-10'>

            <div className='flex w-[50%] flex-col gap-y-4'>
                <div className='h-[70px] w-[70px] bg-black rounded-lg '>

                </div>

                <p className='text-xl font-bold w-[100%] break-all'>{title}</p>
                <div>
                    <span className='text-sm font-bold  '>{dateval}</span>

                </div>

                <div><span className='text-sm font-bold '>{name}</span></div>

            </div>
            <p className='font-light w-[90%] break-all my-2'>
                {desc}
            </p>
            <div>
                {currentUser == true ? <span><button className='text-white font-semibold bg-purple-900 p-4 rounded-xl '
                    onClick={() => {
                        handleClick()
                        // let promptval = prompt("enter data")
                        // if (promptval) {
                        //     if (promptval.length > 100 & promptval.length < 3000) {
                        //         const docRef = doc(db, `blog${currentUserId}`, docId);
                        //         const data = {
                        //             desc: promptval,
                        //         };
                        //         updateDoc(docRef, data)
                        //             .then(async (docRef) => {
                        //                 console.log("A New Document Field has been added to an existing document");
                        //                 const colRef = collection(db, `blog${currentUserId}`);
                        //                 const docsSnap = await getDocs(colRef);
                        //                 currentUserArticles = []
                        //                 docsSnap.forEach(doc => {
                        //                     console.log(doc.data());
                        //                     currentUserArticles.push(doc.data())

                        //                 })
                        //                 setCurrentUserArticles([...currentUserArticles])



                        //             })
                        //             .catch(error => {
                        //                 console.log(error);
                        //             })

                        //     } else {
                        //         alert('please enter title betweeen 5 to 50 letters and desc between 100 to 3000 letters')
                        //     }

                        // }






                    }}
                >Edit</button>
                    <button className='text-white font-semibold bg-red-900 p-4 rounded-xl mx-4 '
                        onClick={() => {
                            let promptVal = prompt(`type 'sure' to delete`)
                            if (promptVal == 'sure') {
                                const docRef = doc(db, `blog${currentUserId}`, docId);
                                deleteDoc(docRef)
                                    .then(async() => {
                                        console.log("Entire Document has been deleted successfully.")
                                        const colRef = collection(db, `blog${currentUserId}`);
                                        const docsSnap = await getDocs(colRef);
                                        currentUserArticles = []
                                        docsSnap.forEach(doc => {
                                            console.log(doc.data());
                                            currentUserArticles.push(doc.data())
                
                                        })
                                        setCurrentUserArticles([...currentUserArticles])
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })

                            }
                        }}
                    >Delete</button></span> : null}
            </div>

            {/* {user ? null : <button className='bg-blue-500 text-white p-3 font-semibold rounded-lg'>Read more of this Publisher</button>} */}
            {publisherId ? <button className='bg-purple-900 border-solid  text-white p-3 font-semibold rounded-lg'
                onClick={async () => {

                    publisherCollection = []
                    setPublisherCollection([...publisherCollection])
                    setReadMoreOfThis(true)
                    console.log(readMoreOfThis)
                    console.log(publisherId)
                    const colRef = collection(db, `blog${publisherId}`);
                    const docsSnap = await getDocs(colRef);
                    docsSnap.forEach(doc => {
                        console.log(doc.data());
                        let docData = doc.data()




                        publisherCollection.push(docData)
                        setPublisherCollection([...publisherCollection])

                        console.log(publisherCollection)
                    })

                }}
            >Read more of this Publisher</button> : null}
        </div>
    )
}

export default Article