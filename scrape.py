from bs4 import BeautifulSoup, FeatureNotFound
import requests
import json
import string
import re
from datetime import datetime 

"""
UNITS

Calories : kcal
fats:g 
cholesterol: mg
sodium: mg
carbs: g
protein: g


"""

hall_urls = {
    "de_neve": r"http://menu.dining.ucla.edu/Menus/DeNeve",
    "epicuria": r"http://menu.dining.ucla.edu/Menus/Epicuria",
    "bplate": r"http://menu.dining.ucla.edu/Menus/BruinPlate"
}

def split_macro(s):
    return re.split(r'(\d+\.?\d*)', s)

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
    
def parse_recipe_link(url):
    """Scrapes the recipe link for all the nutritional info.

    Args:
        url (string): Url to a recipe

    Returns:
        dict: Dictionary with all the nutritional and recipe info.
    """
    print(url)
    req = requests.get(url)
    soup = BeautifulSoup(req.text, "lxml")
    
    recipe_info_dict = {}
    
    # error checking for items without info
    redirect = soup.find("div", {"class": "redirect-info"})
    if redirect != None:
        return None
    
    # name 
    name = soup.find("h2").text
    recipe_info_dict["name"] = name
    
    # brief info
    desc = soup.find("div", {"class":"description"})
    if desc != None:
        # replace for the prepared alcohol on new line
        recipe_info_dict["desc"] = desc.text.strip().replace("\r\n                    \r\n", " ") 
    else:
        recipe_info_dict["desc"] = ""
    
    # the weird ucla badges thing idk
    badges_div = soup.find_all("div", {"class": "prodwebcode"})
    
    badges = []
    if badges_div != None:
        for div in badges_div:
            badges.append(div.text.strip())
        
    recipe_info_dict["info"] = badges
    
    # general nutrition
    nutrition_info = soup.find("div", {"class": "nfbox"}) # nutrition info box
    
    # serving size
    serving_size = nutrition_info.find("p", {"class": "nfserv"}).text
    serving_size = serving_size.split(" ")[2].replace("\xa0", " ") # get only the measurement
    recipe_info_dict["serving_size"] = serving_size
    
    # calories
    calories = nutrition_info.find("p", {"class": "nfcal"}).text.split(" ")[1]
    recipe_info_dict["calories"] = int(calories)
    
    # macros
    macro_p = nutrition_info.find_all("p", {"class": "nfnutrient"})
    for p in macro_p:
        macro_text = split_macro(p.text)
        curr_macro = macro_text[0][:-1].lower().replace(" ", "_") # get the macro name
        
        try:# for unlisted values
            macro_val = float(macro_text[1]) # get the macro's actual value
        except:
            macro_val = "-"
        
        recipe_info_dict[curr_macro] = macro_val
        
    # allergens
    allergen_div = soup.find("div", {"class": "ingred_allergen"})
    
    allergen_p = allergen_div.find_all("p")
    for p in allergen_p:
        if "ALLERGENS" in p.text:
            allergens = p.text.lower().replace(",", "").split(" ")[1:]
            
            if allergens ==[""]:
                allergens = []
            
            recipe_info_dict["allergens"] = allergens
    
    return recipe_info_dict

def get_curr_date(url):
    req = requests.get(url)
    soup = BeautifulSoup(req.text, "lxml")
    
    header = soup.find("h2", {"id":"page-header"}).text
    
    date = re.split(r"[^\d?],", header)[1].strip()
    
    return date

def get_today_food():
    """Parses through all three halls for the current day

    Returns:
        json: Json of all the foods
    """
    food = {}
    food["date"] = get_curr_date(hall_urls["epicuria"])
    
    for hall, hall_url in hall_urls.items():
        recipe_links = get_recipe_links(hall_url)
        
        food[hall] = {"breakfast": [],
                      "lunch": [],
                      "dinner": []}
        
        for meal, recipe_urls in recipe_links.items():
            for recipe_url in recipe_urls:
                food_info = parse_recipe_link(recipe_url)
                
                if food_info != None:
                    food[hall][meal].append(food_info)
                
    
    return food

def save_json(data):
    today = datetime.today().strftime('%m-%d-%Y')
    with open(f"data/food-{today}.txt", "w") as outfile:
        json.dump(data, outfile, indent=2)
    
    
def main():
    food = get_today_food()
    save_json(food)
    
if __name__ == "__main__":
    main()
    # get_curr_date(hall_urls["epicuria"])