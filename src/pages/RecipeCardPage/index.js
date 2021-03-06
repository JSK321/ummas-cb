import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../utils/API'
import RecipeCard from '../../components/RecipeCard'

export default function RecipeCardPage(props) {
    const [recipeState, setRecipeState] = useState({
        recipeName: "",
        recipeDescript: "",
        recipeImage: "",
        recipeId: "",
        ownerId: "",
        numberOfLikes: 0
    });
    const [ingredientState, setIngredientState] = useState({
        item: []
    });
    const [directionState, setDirectionState] = useState({
        directions: "",
    });
    const [savedRecipeState, setSavedRecipeState] = useState({
        accountName: "",
        id: "",
        savedRecipeId: "",
    })
    const [ownerProfileState, setOwnerProfileState] = useState({
        owner: ""
    })
   
    const { recipeName } = useParams();
    const { id } = useParams();

    useEffect(() => {
        fetchData()
        fetchIngreData()
        fetchSavedRecipes()
    }, [])

    function fetchData() {
        API.getOneRecipe(id).then(data => {
            if (data !== null || data !== undefined) {
                setRecipeState({
                    recipeName: data.recipeName,
                    recipeDescript: data.recipeDescript,
                    recipeImage: data.recipeImage,
                    recipeId: recipeName,
                    ownerId: data.UserId,
                    numberOfLikes: data.numberOfLikes
                })
                setDirectionState({
                    directions: data.Steps[0].directions
                })
                API.getOneUser(data.UserId).then(data => {
                    setOwnerProfileState({
                        owner: data.accountName
                    })
                })
            }
        })
    }

    function fetchIngreData() {
        API.getAllIngreForRecipe(id).then(data => {
            if (data !== null && data !== undefined) {
                setIngredientState({
                    item: data
                })
            }
        })
    }

    async function fetchSavedRecipes() {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined && token !== "") {
            const profile = await API.getProfile(token)
            let account = profile.accountName
            let savedData = await API.getAllSavedRecipeByRecipeId(id)
            let user = await savedData.find(obj => obj.savedByUser === account)
            if (user != undefined && user.savedByUser === account) {
                setSavedRecipeState({
                    accountName: user.savedByUser,
                    id: user.UserId,
                    savedRecipeId: user.id,
                })
            } else {
                setSavedRecipeState({
                    accountName: "",
                    id: "",
                })
            }
        }


    }

    function numOfLikes() {
        const newLikes = recipeState.numberOfLikes + 1
        API.updateNumOfLikes(id, newLikes)
    }

    const handleSaveRecipeBtn = event => {
        event.preventDefault()
        numOfLikes()
        API.saveRecipe(props.profile.token, {
            recipeName: recipeState.recipeName,
            ownerId: recipeState.ownerId,
            savedByUser: props.profile.accountName,
            recipeId: id,
            isSaved: true
        }).then(afterSave => {
            window.location.reload()
        })
    }

    const handleUnSaveRecipeBtn = event => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        let confirmAlert = window.confirm("Are you sure to unsave recipe?")
        let targetId = event.currentTarget.id
        if (confirmAlert === true) {
            API.deleteSavedRecipe(token, targetId)
        }
    }

    return (
        <div>
            <RecipeCard
                handleSaveRecipeBtn={handleSaveRecipeBtn}
                handleUnSaveRecipeBtn={handleUnSaveRecipeBtn}
                //Recipe
                recipeName={recipeState.recipeName}
                recipeDescript={recipeState.recipeDescript}
                recipeImage={recipeState.recipeImage}
                ownerId={recipeState.ownerId}
                recipeId={id}
                numberOflikes={recipeState.numberOfLikes}
                // Ingredients
                ingredients={ingredientState.item}
                // Directions
                directions={directionState.directions}
                // User Info
                userId={props.profile.id}
                isLoggedIn={props.profile.isLoggedIn}
                accountName={props.profile.accountName}
                owner={ownerProfileState.owner}
                savedByUser={savedRecipeState.accountName}
                savedRecipeId={savedRecipeState.savedRecipeId}
            />
        </div>
    )
}
