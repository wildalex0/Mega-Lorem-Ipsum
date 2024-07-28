# Before Running

1. Have Node downloaded.
2. Run the following on both the ```backend``` and ```client```
   
``` 
npm install
```

# Running Code
## Backend

1. Open ```Backend``` folder
2. Run the following command
```
node backend.js
```

## Front-end

1. Open the ```client``` folder.
2. Run the following command
```
npm run dev
```

# Core Features
## Mobile Friendly Design
This project is designed with mobile usage in mind, following a mobile first approach. Using ```tailwind css``` allowed this to be more straight forwards.
One feature that caters to this well is the fact that the function buttons stick at the top of the page allowing for functionality to be taken even at the bottom of the page.

## URL Address Transferring - State Saving
It is possible to transfer the URL Address to another user, which then opens the same window that was previously opened. It also differentiates between the ```Edit``` and the ```Add``` feature when doing this.
### History Logging
The URL Address transferring feature is done by keeping a log of user activity. This consists of the type of action performed (ADD, EDIT, DELETE) aswell as the popup's state.

## Interactive Popup
- Whenever any data is changed, a popup is risen which consists of a form. The popup has an opening and closing animation, being 300ms each. 
- Whenever the popup is opened, no scrolling can be done. Clicking out of the popup will also close it. Finally pressing the ```ESC``` key also closes this popup.

## Paging System
Due to the number of rows that are present, in consideration of mobile users, a page system is implemented. In it the rows are split within every ```50 Records```, going into a new page.

## Data Manipulation
Data that is saved and fetched from the backend server is all manipulated using a REST API. 

### Add Feature
Adds a new record through a form within a popup.

### Edit Feature
Edits an already existing record through a form within a popup. There is validation in place to make sure a record is selected.

### Delete Feature
Deletes an already existing record through a confirmation window. There is validation in place to make sure a record is selected.

# Screenshots

Home-screen

![image](https://github.com/user-attachments/assets/aaff548b-d3b9-4193-ae27-7cc788e591be)

Add Popup

![image](https://github.com/user-attachments/assets/3dfb6a3f-e3cc-4e6d-84b7-3c8c39c148ca)

Edit Popup

![image](https://github.com/user-attachments/assets/6ec67adb-c75c-4d48-9fec-b55acd6ac242)

Delete Confirmation

![image](https://github.com/user-attachments/assets/38384aa7-beae-40a4-9a3d-785d9d5c5cdb)

Mobile View

![image](https://github.com/user-attachments/assets/4fc641fe-0875-4deb-97cb-9f46ab7ac1c9)
