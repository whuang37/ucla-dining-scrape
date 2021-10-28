from bs4 import BeautifulSoup
import requests
import json
import string

hall_urls = {
    "de_neve": r"http://menu.dining.ucla.edu/Menus/DeNeve",
    "epicuria": r"http://menu.dining.ucla.edu/Menus/Epicuria",
    "bplate": r"http://menu.dining.ucla.edu/Menus/BruinPlate"
}

def get_recipe_links(url):
    """Create a data structure of all the different recipes from a menu website

    Args:
        url (string): Url to a UCLA dining website. Should be the detailed version

    Returns:
        dict: Dict with keys being the meal and values being list of recipe links. 
    """
    req = requests.get(url)
    soup = BeautifulSoup(req.text, "lxml")
    
    meal_divs = soup.find_all("div", {"class": "menu-block half-col"}) # get all the columns
    
    if len(meal_divs) == 0:
        # bplate and deneve have three columns so class is different
        meal_divs = soup.find_all("div", {"class": "menu-block third-col"}) # get all the columns

    recipe_link_dict =  {"breakfast": [],
                         "lunch": [],
                         "dinner": []}
    
    for meal in meal_divs:
        curr_meal = meal.h3.text.lower() # get the label of the current column
        
        recipe_a = meal.find_all("a", {"class": "recipelink"}) # get all the a's with links to recipes
        
        for a in recipe_a:
            recipe_link_dict[curr_meal].append(a.get("href"))
        
    return recipe_link_dict
    
    
if __name__ == "__main__":
    get_recipe_links(hall_urls["de_neve"])