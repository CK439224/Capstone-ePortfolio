![](assets/banner.png)
# Christopher King SNHU CS-499 Capstone-ePortfolio

<p align="center">
OVERVIEW
</p>

For my final project in the SNHU CS-499 Capstone, I demonstrated the knowledge and skills acquired throughout my Bachelor of Science in Computer Science program. The project involved selecting a previously developed program or set of programs and enhancing them in three key categories: Software Design and Engineering, Algorithms and Data Structures, and Databases. I chose to focus on a single program, applying enhancements across all three categories to showcase a comprehensive approach to software development.

---

<p align="center">
Code Review
</p>

https://youtu.be/SGY3JVHHWBs

---

<p align="center">
Original Program
</p>

[Original_Program/IT_145_Final_Project_v3.0/Final_Project_v3.0](https://github.com/CK439224/Capstone-ePortfolio.github.io/tree/main/Original_Program/IT_145_Final_Project_v3.0/Final_Project_v3.0)

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
Version 1
</p>

https://github.com/CK439224/Capstone_versions.git/

---


