//////////////
// // LENSES DESCRIPTION

// Item controlller
const ItemCtrl = (function() {
    // item constructor
    const item = function(lenseName) {
        this.name = lenseName;
    }

    // Data structure / State
    const data = {
        items: [
            {
                lense: "SL78-1", 
                testName: "Параметры испытаний",
                power: "50 Вт (120 лм/В)",
                height: "5.5м",
                width: "3.75м"
            },
            {
                lense: 'SL78-2',
                resultsName: "Однородность освещенности",
                resultsValue: "0.54"
            },
            {
                lense: 'SL78-3',
                resultsName: "Однородность освещенности",
                resultsValue: "0.63"
            },
            {
                lense: 'SL78-4',
                resultsName: "Однородность освещенности",
                resultsValue: "0.68"
            },
            {
                lense: 'SL78-45',
                resultsName: "Однородность освещенности",
                resultsValue: "0.46"
            }, 
            {
                lense: 'SL92-7',
                testName: "Параметры испытаний",
                radius: "1м",
                power: "75 Вт (120 лм/В)",
                height: "30м",
                quantity: 10,
                angle: 0
            }
        ],
        currentItem: {
            lense: "SL78-1",
            testName: "Параметры испытаний",
            power: "50 Вт (120 лм/В)",
            height: "5.5м",
            width: "3.75м"
        },
        itemsToDisplay: null
    }

    // Public methods
    return {
        logData: function() {
            return data;
        },
        getItems: function() {
            return data.items;
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        getItemById: function(id) {
            let found = null;
            // Loop through items
            data.items.forEach(item => {
                if (item.lense === id) {
                    found = item;
                }
            });
            return found;
        },
        setIndexToDisplay: function(first, last) {
            data.itemsToDisplay = [first, last];
        },
        getIndexToDisplay: function() {
            return data.itemsToDisplay;
        },
        getCurrentItemIndex: function() {
            let currentItemIndex;
            // console.log(data.items);
            // console.log(data.currentItem);
            data.items.forEach(item => {
                // console.log(item);
                if(item.lense == data.currentItem.lense) {
                    currentItemIndex = data.items.indexOf(item);
                    // console.log(currentItemIndex);
                }
            })
            return currentItemIndex;
        },




    }
})()

// UI controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: ".description-list--lenses",
        lensesList: ".description-item--lenses",
        nextBtn: ".nav-item--next",
        prevBtn: ".nav-item--prev",
        navDescriptions: ".nav-item--description",
        description: ".single-lense"
    }

    // Public methods
    return {
        getSelectors: function() {
            return UISelectors;
        },
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `
                <li class="description-item--lenses" id="${item.lense}">
                    <img src="img/lights/${item.lense}_2.png" alt="Линза ${item.lense}" class="description-item__image">
                    <figure>
                        <img src="img/lights/${item.lense}_graph.svg" alt="" class="description-item__image">
                    </figure>
                    <figure>
                        <img src="img/lights/${item.lense}_thermo.png" alt="" class="description-item__image">
                    </figure>
                </li>
                `;
                // console.log(html);
            })

            // insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        showDescription: function(item) {
            // console.log(item);
            let html = '';
            html += `
                <header class="lense-heading"><h3 class="heading-3 lense-title">${item.lense}</h3></header>
                    <figure class="lense-container"><img src="img/lights/${item.lense}_1.png" alt="" class="lense-image"></figure>
                    <figure class="lense-container__graph"><img src="img/lights/${item.lense}_graph.svg" alt="" class="lense-image--graph"></figure>
                    <figure class="lense-container__termo"><img src="img/lights/${item.lense}_thermo.png" alt="" class="lense-image--termo">
            `;
            if (item.width) {
                html += `
                <figcaption class="lense-termo__caption">
                    <h4 class="heading-4 lense-termo__title">параметры испытаний:</h4>
                    <div class="lense-termo__item">
                        <h5 class="heading-5">мощность:</h5>
                        <p class="paragraph">${item.power}</p>
                    </div>
                    <div class="lense-termo__item">
                        <h5 class="heading-5">Дистанция между опорами:</h5>
                        <p class="paragraph">${item.height}</p>
                    </div>
                    <div class="lense-termo__item">
                        <h5 class="heading-5">высота установки:</h5>
                        <p class="paragraph">${item.width}</p>
                    </div>
                </figcaption>
                </figure>
                `;
            } else if(item.quantity) {
                html += `
                <figcaption class="lense-termo__caption">
                            <h4 class="heading-4 lense-termo__title">параметры испытаний:</h4>
                            <div class="lense-termo__item">
                                <h5 class="heading-5">мощность:</h5>
                                <p class="paragraph">${item.power}</p>
                            </div>
                            <div class="lense-termo__item">
                                <h5 class="heading-5">радиус:</h5>
                                <p class="paragraph">${item.radius}</p>
                            </div>
                            <div class="lense-termo__item">
                                <h5 class="heading-5">высота установки:</h5>
                                <p class="paragraph">${item.height}</p>
                            </div>
                            <div class="lense-termo__item">
                                <h5 class="heading-5">количество светильников:</h5>
                                <p class="paragraph">${item.quantity}</p>
                            </div>
                            <div class="lense-termo__item">
                                <h5 class="heading-5">угол относительно горизонта:  </h5>
                                <p class="paragraph">${item.angle}</p>
                            </div>
                        </figcaption>
                    </figure>
                `;
                // console.log(html);
            } else if(item.resultsName) {
                html += `
                <figcaption class="lense-termo__caption">
                            <h4 class="heading-4 lense-termo__title">${item.resultsName}: </h4>
                            <div class="lense-termo__item">
                                <h5 class="heading-5">${item.resultsValue}</h5>
                            </div>
                        </figcaption>
                    </figure>
                `;
                // console.log(html);
            }
            // remove active icons
            UICtrl.setItemToInactive();
            // Change icon to active
            UICtrl.addToItemActiveClass(item);

            // insert html to description
            document.querySelector(UISelectors.description).innerHTML = html;
        },
        hideDescription: function() {
            document.querySelector(UISelectors.description).innerHTML = '';
        },
        showNavItem: function(navItem) {
            navItem.classList.add('active');
        },
        hideNavItem: function(navItem) {
            navItem.classList.remove('active'); 
        },
        addToItemActiveClass: function(currentItem) {
            // console.log(currentItem);
            document.getElementById(currentItem.lense).classList.add('active');
        },
        setItemToInactive() {
            document.querySelectorAll(UISelectors.lensesList).forEach(item => item.classList.remove('active'));
        },
        hideItems(items) {
            items.forEach(item => item.classList.add('display-none'));
            // TODO change class name
        },
        showItem(item) {
            item.classList.remove('display-none');
            // TODO change class name
        },
        // Display Item set if it inbetween of indexes in ItemCtrl
        displayItems(indexToDisplay) {
            // hide all items
            const allItems = document.querySelectorAll(UISelectors.lensesList);
            UICtrl.hideItems(allItems);
            const allItemsArr = Array.from(allItems);
            // console.log(allItemsArr);
            
            let inbetween = false;
            // show items with indexes from Indextodisplay
            allItemsArr.forEach(listItem => {
                // console.log(listItem.getAttribute('id'));
                // console.log(listItem);
                // console.log(allItemsArr.indexOf(listItem));
                if (allItemsArr.indexOf(listItem) == ItemCtrl.getIndexToDisplay()[0] || (allItemsArr.indexOf(listItem) == ItemCtrl.getIndexToDisplay()[1])) {
                    inbetween = !inbetween;
                    // console.log(inbetween);
                }
                if(inbetween) {
                    UICtrl.showItem(listItem);
                    // console.log('item to show')
                }
            })
        }

    }
    
})()

// App controller
const App = (function(UICtrl, ItemCtrl) {
    // Load event listeners
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();
    const loadEventListeners = function() {

        // show description on click to nav menu
        document.querySelectorAll(UISelectors.navDescriptions).forEach(nav => nav.addEventListener('click', showDescriptionOnStart));

        // Show description event
        document.querySelectorAll(UISelectors.lensesList).forEach(item => item.addEventListener('click', changeDescriptionClick));
        // need to change current item to target one, than show description

        // Next and Prev buttons
        document.querySelector(UISelectors.nextBtn).addEventListener('click', showNextItemSet)
        document.querySelector(UISelectors.prevBtn).addEventListener('click', showPrevItemSet)

    }

    const changeDescriptionClick = function() {
        // get lense name / id
        const clickedItemId = this.getAttribute('id');
        // console.log(clickedItemId);
        
        // find item in database
        const itemToShow = ItemCtrl.getItemById(clickedItemId);

        // add to current item
        ItemCtrl.setCurrentItem(itemToShow);
        // const a = ItemCtrl.getCurrentItem();
        // console.log(a);

        // show description of current item
        UICtrl.showDescription(itemToShow);
    }

    const showDescriptionOnStart = function() {
        if(this.dataset.index == 3) {
            // Get current Item
            const item = ItemCtrl.getCurrentItem();
    
            // Show description
            UICtrl.showDescription(item);
            // console.log('onstart');
        } else {
            UICtrl.hideDescription();
        }
    }

    const showNextItemSet = function() {
        // show previous button
        UICtrl.showNavItem(document.querySelector(UISelectors.prevBtn));

        let indexToDisplay = ItemCtrl.getIndexToDisplay();
        indexToDisplay[0] = indexToDisplay[0] + 1;
        indexToDisplay[1] = indexToDisplay[1] + 1;
    
        // set new indexes
        ItemCtrl.setIndexToDisplay(indexToDisplay[0], indexToDisplay[1]);
        // console.log(ItemCtrl.getIndexToDisplay());

        // check if last item is already showing
        if (indexToDisplay[1] >= ItemCtrl.getItems().length) {
            UICtrl.hideNavItem(document.querySelector(UISelectors.nextBtn));
        }

        // change current item
        // find index of current item
        const currentItemIndex = ItemCtrl.getCurrentItemIndex();
        // console.log(currentItemIndex);
        if(currentItemIndex < indexToDisplay[0]) {
            const currentItem = ItemCtrl.getItems()[indexToDisplay[0]];
            // console.log(currentItem);
            ItemCtrl.setCurrentItem(currentItem);
            // Show current item
            UICtrl.addToItemActiveClass(currentItem);
            // show description
            UICtrl.showDescription(currentItem);
        }

        // show items
        UICtrl.displayItems(indexToDisplay);
        // console.log(ItemCtrl.getItems().length);
    }

    const showPrevItemSet = function () {
        // show next
        UICtrl.showNavItem(document.querySelector(UISelectors.nextBtn));

        let indexToDisplay = ItemCtrl.getIndexToDisplay();
        // console.log(indexToDisplay);
        indexToDisplay[0] = indexToDisplay[0] - 1;
        indexToDisplay[1] = indexToDisplay[1] - 1;
        
        // check if last item is already showing
        if (indexToDisplay[0] == 0) {
            // console.log(indexToDisplay[0]);
            UICtrl.hideNavItem(document.querySelector(UISelectors.prevBtn));
            // console.log('lastItem');
        }
        // set new indexes
        ItemCtrl.setIndexToDisplay(indexToDisplay[0], indexToDisplay[1]);

        // change current item
        // find index of current item
        const currentItemIndex = ItemCtrl.getCurrentItemIndex();
        // console.log(currentItemIndex);
        // console.log(indexToDisplay[1]);
        if (currentItemIndex > indexToDisplay[1] - 1) {
            const currentItem = ItemCtrl.getItems()[indexToDisplay[1] - 1];
            // console.log(currentItem);
            ItemCtrl.setCurrentItem(currentItem);
            // Show current item
            UICtrl.addToItemActiveClass(currentItem);
            // show description
            UICtrl.showDescription(currentItem);
        }

        // show items
        UICtrl.displayItems(ItemCtrl.getIndexToDisplay());

    }

    // Public methods
    return {
        init: function() {
            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Populate list with items
            UICtrl.populateItemList(items);

            // set items to display
            items.length > 4 ? ItemCtrl.setIndexToDisplay(0, 4) : ItemCtrl.setIndexToDisplay(0, items.length);

            // Show only 4 items> Pass indexes from ItemCtrl
            // TODO change itemsToDisplay to indexes
            UICtrl.displayItems(ItemCtrl.getIndexToDisplay());

            // Show current item
            const currentItem = ItemCtrl.getCurrentItem();
            UICtrl.addToItemActiveClass(currentItem);

            // Show next icon
            items.length > 4 ? UICtrl.showNavItem(document.querySelector(UISelectors.nextBtn)) : null;

            // Load event listeners
            loadEventListeners();

            // showNexItems();

        }

    }

})(UICtrl, ItemCtrl)

// Initialize App
App.init();


