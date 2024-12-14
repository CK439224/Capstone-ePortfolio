<div align="center">
  <img src="assets/banner.png" alt="Alt Text" width="800" height="auto">
</div>

# Christopher King SNHU CS-499 Capstone-ePortfolio

<p align="center">
OVERVIEW
</p>

For my final project in the SNHU CS-499 Capstone, I demonstrated the knowledge and skills acquired throughout my Bachelor of Science in Computer Science program. The project involved selecting a previously developed program or set of programs and enhancing them in three key categories: Software Design and Engineering, Algorithms and Data Structures, and Databases. I chose to focus on a single program, applying enhancements across all three categories to showcase a comprehensive approach to software development. 

---

<p align="center">
Code Review
</p>

I conducted a code review addressing three key computer science categories: software engineering and design, algorithms and data structures, and databases. The code review was submitted as a video walkthrough where I analyzed existing code for weaknesses, limitations, and vulnerabilities, while proposing enhancements to improve functionality, structure, and efficiency. Click the link below the image to view my code review on YouTube.

<div align="center">
  <img src="assets/Code_Review.png" alt="Alt Text" width="800" height="auto">
</div>

<p align="center">
https://youtu.be/SGY3JVHHWBs
</p>

---

<p align="center">
Original Program Guidelines, Code, and Screenshots
</p>

# Grazioso Salvare Specification

## Overview
Grazioso Salvare primarily uses dogs as search and rescue animals but plans to train monkeys for similar purposes. 
- Dogs initially receive an "intake" status before beginning training. 
- As training progresses, their status changes through five phases: **Phase I to Phase V**. 
- Dogs that successfully complete training gain **"in-service"** status and are designated as Rescue Animals. 
- Those unable to complete training are assigned **"farm"** status, indicating they will retire on a Grazioso Salvare farm.

## Animals
When acquiring a dog, Grazioso Salvare tracks the following details:
- **Name**
- **Breed**
- **Gender**
- **Age**
- **Weight**
- **Acquisition date and location**

Additionally, the organization records:
- The dog's training status.
- If the dog is "in-service," its assigned country and reservation status.

## Special Considerations for Monkeys
The organization is expanding its system to accommodate tracking monkeys. The following monkey species are eligible for training:
- **Capuchin**
- **Guenon**
- **Macaque**
- **Marmoset**
- **Squirrel Monkey**
- **Tamarin**

Unique attributes for monkeys include:
- **Tail length**
- **Height**
- **Body length**
- **Species**

## Required Functionality

### Monkey Class
- Extend the `RescueAnimal` class.
- Include monkey-specific attributes.
- Implement accessor (getter) and mutator (setter) methods for all attributes.

### Driver Class
Add a **menu-driven loop** that:
1. Displays the provided menu.
2. Collects and validates user input.
3. Executes actions based on user selections.

#### Implement the following methods:
- **Intake a new dog**:
  - Prompt for and validate user inputs.
  - Populate dog attributes.
  - Add the dog to an `ArrayList`.

- **Intake a new monkey**:
  - Validate inputs, including name and species.
  - Populate monkey attributes.
  - Add the monkey to an `ArrayList`.

- **Reserve an animal**:
  - Identify animals matching user criteria from the `ArrayList`.
  - Update the `reserved` status if a match is found.
  - Provide feedback if no match exists.

- **Display animal information**:
  - Print lists of:
    - All dogs.
    - All monkeys.
    - Animals that are "in-service" and available (not reserved).


[Original_Program/IT_145_Final_Project_v3.0/Final_Project_v3.0](https://github.com/CK439224/Capstone-ePortfolio.github.io/tree/main/Original_Program/IT_145_Final_Project_v3.0/Final_Project_v3.0)

These are screenshots of the original program:

<figure align="center">
  <figcaption>Menu Screenshot</figcaption>
  <img src="assets/Orig_Program_Menu.png" alt="Menu Screenshot" width="400">
</figure>
<figure align="center">
  <figcaption>List Screenshot</figcaption>
  <img src="assets/Orig_Program_List.png" alt="List Screenshot" width="400">
</figure>
<figure align="center">
  <figcaption>Intake Screenshot</figcaption>
  <img src="assets/Orig_Program_Intake.png" alt="Intake Screenshot" width="400">
</figure>

---

<p align="center">
Plan
</p>

### Category One: Software Engineering and Design

- To enhance the Rescue Animal program by converting it into a website, I will develop a full-stack web application that retains and expands the core functionality of the original Java program. For this project, I will use a technology stack that includes a JavaScript framework (such as Angular) for the frontend, Node.js with Express for the backend, and MongoDB as the database. This combination provides a scalable and flexible environment for both animal management and adoption processing, making the program accessible to a broader audience online.

### Category Two: Algorithms and Data Structures

- **Querying and Indexing with MongoDB**  
  Since I will be using MongoDB, the enhancement plan will leverage MongoDB's built-in capabilities for fast querying, indexing, and sorting, rather than implementing custom algorithms for these tasks. MongoDB’s NoSQL structure offers efficient data retrieval through native querying and indexing, making it well-suited for handling large datasets without additional custom code for searching, filtering, and sorting.

- **Filtering by Animal Type**  
  When filtering animals by type (e.g., Dog or Monkey), MongoDB’s indexing capabilities enable rapid lookups. By creating an index on the `type` field, MongoDB's query functions can retrieve all animals of a specific type efficiently. This approach achieves similar speed benefits to a hash table without additional implementation.

- **Sorting by Adoption Status**  
  For sorting animals by adoption status, MongoDB offers a `.sort()` method that allows sorting by any field, including reservation status. By applying an index on this field, MongoDB can sort large datasets quickly, providing the performance benefits of custom algorithms like merge sort directly within the database.

- **Optimized Query System**  
  Overall, MongoDB’s indexing and querying system provides the efficiency that custom algorithms would offer in a traditional setup, allowing us to optimize database indexing and query structuring instead. This approach achieves the same user-facing benefits—fast searches, efficient filtering, and responsive sorting—while aligning closely with MongoDB's architecture to ensure scalability and high performance.

### Category Three: Databases

To enhance the Rescue Animal program in alignment with database management best practices, I will focus on designing an optimized MongoDB database schema, integrating indexing, creating relationships, and implementing data validation. This plan aims to improve the efficiency, organization, and reliability of data storage and retrieval processes, aligning with the program’s expanded functionality needs.

- **Schema Design**  
  The schema consists of one main collection: `Animals`. The `Animals` collection will store all necessary details about each animal, including fields like `name`, `type`, `breed`, `age`, `description`, and `reservationStatus`. To optimize data retrieval, indexing will be applied to frequently used fields such as `type` and `reservationStatus`. This indexing allows for quick filtering, making it easy for users to search by type (e.g., Dog, Monkey) and by adoption status (e.g., Available, Reserved).

- **Data Validation**  
  Data validation will focus on ensuring accurate and complete entries within the `Animals` collection. Required fields like `name` and `type` will be enforced, and `reservationStatus` will use predefined values (`Available`, `Reserved`, `Pending`) to maintain data consistency and reliability.

---

<p align="center">
Project Reflection
</p>

Starting this project early allowed me to maintain a steady pace and gave me extra time to address potential challenges. This approach proved beneficial as I transitioned the original standalone Java application into a full-stack application, showcasing an enhanced understanding of software design and development. I made significant improvements, including better encapsulation and the implementation of design patterns, such as the Factory Method in `RescueAnimal.java`. Additionally, I integrated MongoDB for database functionality, enabling seamless data handling between the front-end and back-end.

While I have achieved many milestones, such as creating an intuitive user interface and establishing smooth interactions with MongoDB, I recognized that there was still more to do. I planned to refine the front-end further, enhance database interactions to support additional features, and improve the filters available in the animal list. Furthermore, I aimed to restrict user registration by requiring approval or limiting it to specific individuals, ensuring better control over access.

I believe my project demonstrates evidence of improvement across all key areas. However, in hindsight, I realize that I should have prioritized security measures throughout the project rather than treating it as a final step. Although I have implemented some security measures, I still had to fine-tune the existing ones and introduce additional safeguards to ensure the application is robust and secure. 

This reflection highlights both my progress and my commitment to continuously improving my work, leveraging the knowledge and skills I’ve gained throughout my academic journey.


---

<p align="center">
Version 1
</p>

https://github.com/CK439224/Capstone_versions.git/

---


