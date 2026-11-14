import RecipeActions from '../card/RecipeActions.tsx';
import RecipeCard from '../card/RecipeCard.tsx';
import RecipeDescription from '../card/RecipeDescription.tsx';

const RecipePageContent = () => {

    return (
        <main className="recipe-main">
            <RecipeActions />
            <RecipeCard/>
            <RecipeDescription />
        </main>
    );
};

export default RecipePageContent;