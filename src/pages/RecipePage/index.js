import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import API from '../../utils/API'
import RecipeForm from '../../components/RecipeForm'

export default function RecipePage(props) {
    // -----------------States-----------------
    const [recipeState, setRecipeState] = useState({
        recipeName: "",
        recipeCategory: "",
        recipeDescript: "",
        recipeImage: ""
    });
    const [imgLoadingState, setImgLoadingState] = useState(false);

    useEffect(() => {

    }, [])
    // -----------------Input changes-----------------
    const handleRecipeInputChange = event => {
        const { name, value } = event.target
        setRecipeState({
            ...recipeState,
            [name]: value
        })
    };
    const handleSelectCategory = event => {
        let category = event.target.value
        setRecipeState({
            ...recipeState,
            recipeCategory: category
        })
    };
    const handleUploadImgBtn = event => {
        event.preventDefault()
        document.getElementById('uploadImg').click()
    };
    const handleUploadImg = async event => {
        event.preventDefault()
        const files = event.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'ummas_cb')
        setImgLoadingState(true)
        const res = await API.uploadImage(data)
        const file = await res.json()
        setRecipeState({
            ...recipeState,
            recipeImage: file.secure_url
        })
        setImgLoadingState(false)
    };
    // -----------------Form Submit-----------------
    const handleFormSubmit = event => {
        event.preventDefault()
        if (props.profile.isLoggedIn === true) {
            API.createRecipe(props.profile.token, {
                ...recipeState,
            }).then(afterCreate => {
                API.getRecipes().then(res => {
                    let recipeId = res.slice(-1)[0].id
                    window.location.href = `/ingredientform/${recipeId}`
                }
                )
            })
        } else {
            alert("Sign in to add new recipe.")
            window.location.href = "/signin"
        }
    }

    return (
        <div>
            <RecipeForm
                handleRecipeInputChange={handleRecipeInputChange}
                handleSelectCategory={handleSelectCategory}
                handleFormSubmit={handleFormSubmit}
                handleUploadImgBtn={handleUploadImgBtn}
                handleUploadImg={handleUploadImg}
                recipeName={recipeState.recipeName}
                recipeCategory={recipeState.recipeCategory}
                recipeImage={recipeState.recipeImage}
                recipeDescript={recipeState.recipeDescript}
                loading={imgLoadingState}
            />
        </div>
    );
};
