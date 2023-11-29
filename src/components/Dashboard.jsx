import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL, API_QUESTIONS_URL, TOKEN_NAME } from "../constants";
import '../App.css';

function Dashboard() {

    const [IsLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [numQuestions, setNumQuestions] = useState(0);
    const [, setLoading] = useState(true);
    const [, setError] = useState(null);

    useEffect(() => {
        async function loadQuestions() {
            const token = localStorage.getItem(TOKEN_NAME)
            if (token && IsLoggedIn) {
                try {
                    const response = await fetch(API_QUESTIONS_URL, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.ok) {
                        const json = await response.json();
                        setQuestions(json);
                        setNumQuestions(json.length);
                    } else {
                        throw response;
                    }
                } catch (e) {
                    setError("An error occured whe fetching questions");
                    console.log("Error", e.toString());
                } finally {
                    setLoading(false);
                }

            }
        }

        loadQuestions();

    }, [IsLoggedIn]);

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_NAME)
        if (token) {
            fetch(`${API_BASE_URL}/auto_login`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((response) => {
                    if (!response.ok) throw new Error(response.status);
                    else return response.json();
                })

                .then(data => {
                    setLoggedIn(true);
                })

                .catch((error) => {
                    console.log('error: ' + error);
                    navigate("/login")
                });

        } else {
            navigate("/login")
        }
    }, [navigate]);

    const logout = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/logout`, {
                method: "delete",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem(TOKEN_NAME)
                },
            })
            const data = await response.json()
            if (!response.ok) throw data.error

        } catch (error) {
            console.log("error", error)
        }
    }
    const handleClick = (evt) => {
        evt.preventDefault()
        logout();
        localStorage.removeItem(TOKEN_NAME);
        window.location.reload()
    }

    return (
        <div>
            {/*<div className="flexbox-container">*/}
            {/*    <Link to="/">Home</Link>*/}
            {/*    <Link onClick={handleClick}>Logout</Link>*/}
            {/*</div>*/}
            <div>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link onClick={handleClick}>Logout</Link>
                </li>

                <h2>We have {numQuestions} questions answered!</h2>
            </div>

            <div className="queue">
                {questions.map((question) => (
                    <div key={question.id} className="question-container">
                        <h2>Q: {question.question}</h2>
                        <p>A: {question.answer}</p>
                        <p>Asked {question.ask_count} times</p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard
