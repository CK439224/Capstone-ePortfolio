// Chris King    12/10/22

import java.util.ArrayList;
import java.util.Scanner;

public class Driver {
    private static ArrayList<Dog> dogList = new ArrayList<Dog>();
    private static ArrayList<Monkey> monkeyList = new ArrayList<Monkey>(); //Added Monkey Array
    // Instance variables (if needed)

    public static void main(String[] args) {


        initializeDogList();
        initializeMonkeyList();
        
        Scanner input = new Scanner(System.in);
        boolean inputLoop = true;
        char choice;
        
        do {
        	displayMenu();
        	choice = input.next().charAt(0);

        	switch(choice) {
        	case '1':
        		intakeNewDog(input); //If choice one is selected, intakeNewDog method is called
        		break;

        	case '2':
        		intakeNewMonkey(input); //If choice two is selected, intakeNewMonkey method is called
        		break;

        	case '3':
        		reserveAnimal(input); //If choice three is selected, reserveAnimal is called
        		break;

        	case '4':
        		printAnimals("dog"); //If choice 4 is selected, the dog list will print out
        		break;

        	case '5':
        		printAnimals("monkey"); //If choice 5 is selected, the monkey list will print out
        		break;

        	case '6':
        		printAnimals("available"); //If choice 6 is selected, a list showing all available dog's and monkeys
        		break;

        	case 'q':
        		System.out.println("Quit application"); //If choice "q" is selected, the application is exited
        		inputLoop = false;
        		break;

        	default:
        		System.out.println("Invalid entry");

        	}
        } while(inputLoop);
        System.out.println("Goodbye");
        

        // Add a loop that displays the menu, accepts the users input
        // and takes the appropriate action.
	// For the project submission you must also include input validation
        // and appropriate feedback to the user.
        // Hint: create a Scanner and pass it to the necessary
        // methods 
	// Hint: Menu options 4, 5, and 6 should all connect to the printAnimals() method.

    }

    // This method prints the menu options
    public static void displayMenu() {
        System.out.println("\n\n");
        System.out.println("\t\t\t\tRescue Animal System Menu");
        System.out.println("[1] Intake a new dog");
        System.out.println("[2] Intake a new monkey");
        System.out.println("[3] Reserve an animal");
        System.out.println("[4] Print a list of all dogs");
        System.out.println("[5] Print a list of all monkeys");
        System.out.println("[6] Print a list of all animals that are not reserved");
        System.out.println("[q] Quit application");
        System.out.println();
        System.out.println("Enter a menu selection");
    }


    // Adds dogs to a list for testing
    public static void initializeDogList() {
        Dog dog1 = new Dog("Spot", "German Shepherd", "male", "1", "25.6", "05-12-2019", "United States", "intake", false, "United States");
        Dog dog2 = new Dog("Rex", "Great Dane", "male", "3", "35.2", "02-03-2020", "United States", "Phase I", false, "United States");
        Dog dog3 = new Dog("Bella", "Chihuahua", "female", "4", "25.6", "12-12-2019", "Canada", "in service", true, "Canada");

        dogList.add(dog1);
        dogList.add(dog2);
        dogList.add(dog3);
    }


    // Adds monkeys to a list for testing
    //Optional for testing
    public static void initializeMonkeyList() {
    	Monkey monkey1 = new Monkey("Skippy", "Male", "5", "15.5", "11/15/2021", "United States", "intake", false, "United States", "5.2", "36.4", "28.6", "Capuchin");
    	Monkey monkey2 = new Monkey("Max", "Male", "2", "14.5", "10/15/2021", "United States", "in service", false, "United States", "4.2", "32.4", "27.6", "Guenon");
    	Monkey monkey3 = new Monkey("Viper", "Male", "3", "13.5", "09/15/2021", "United States", "in service", false, "United States", "4.3", "38.4", "26.6", "Macaque");
    	
    	monkeyList.add(monkey1);
    	monkeyList.add(monkey2);
    	monkeyList.add(monkey3);
    }


    // Complete the intakeNewDog method
    // The input validation to check that the dog is not already in the list
    // is done for you
    
    //This section will verify that the dog is not already on the list
    public static void intakeNewDog(Scanner scanner) {
        System.out.println("What is the dog's name?");
        scanner.nextLine();
        String name = scanner.nextLine();
        for(Dog dog: dogList) {  //This loop checks to see if the name is already listed
            if(dog.getName().equalsIgnoreCase(name)) {
                System.out.println("\n\nThis dog is already in our system\n\n");
                return; //returns to menu
            }
        }

        // Code to instantiate a new dog and add it to the appropriate list
        System.out.println("What is " + name + "'s breed?");
        String breed = scanner.nextLine(); //Assigns user input to breed
        System.out.println("What is " + name + "'s gender?");
        String gender = scanner.nextLine(); //Assigns user input to gender
        System.out.println("What is " + name + "'s age?");
        String age = scanner.nextLine(); //Assigns user input to age
        System.out.println("What is " + name + "'s weight?");
        String weight = scanner.nextLine(); //Assigns user input to weight
        System.out.println("What was " + name + "'s acquisition date?");
        String acquisitionDate = scanner.nextLine(); //Assigns user input to acquisitionDate
        System.out.println("What was " + name + "'s acquisition country?");
        String acquisitionCountry = scanner.nextLine(); //Assigns user input to acquisitionCountry
        System.out.println("What is " + name + "'s training status?");
        String trainingStatus = scanner.nextLine(); //Assigns user input to trainingStatus
        System.out.println("Is " + name + " reserved? [true or false]");
        boolean reserved = scanner.nextBoolean(); //Assigns user input to reserved
        scanner.nextLine();
        System.out.println("What is " + name + "'s service country?");
        String inServiceCountry = scanner.nextLine(); //Assigns user input to serviceCountry
        
        Dog newDog = new Dog(name, breed, gender, age, weight, acquisitionDate, acquisitionCountry,
        		trainingStatus, reserved, inServiceCountry);
        dogList.add(newDog);
        
    }
    


        // Complete intakeNewMonkey
	//Instantiate and add the new monkey to the appropriate list
        // For the project submission you must also  validate the input
	// to make sure the monkey doesn't already exist and the species type is allowed
        public static void intakeNewMonkey(Scanner scanner) {
            System.out.println("What is the monkey's name?");
            scanner.nextLine();
            String name = scanner.nextLine();
            System.out.println();
            for(Monkey monkey: monkeyList) { //This loop checks to see if the name is already listed
                if(monkey.getName().equalsIgnoreCase(name)) {
                    System.out.println("\n\nThis monkey is already in our system\n\n");
                    return; //returns to menu     ****
                }
             
            }
            System.out.println("What is " + name + "'s gender?");
            String gender = scanner.nextLine(); //Assigns user input to gender
            System.out.println("What is " + name + "'s age?");
            String age = scanner.nextLine(); //Assigns user input to age
            System.out.println("What is " + name + "'s weight?");
            String weight = scanner.nextLine(); //Assigns user input to weight
            System.out.println("When was " + name + "'s acquisition date?");
            String acquisitionDate = scanner.nextLine(); //Assigns user input to acuisitionDate
            System.out.println("Where was " + name + "'s acquisition made?");
            String acquisitionCountry = scanner.nextLine(); //Assigns user input to acquisitionCountry
            System.out.println("What is " + name + "'s training status?");
            String trainingStatus = scanner.nextLine(); //Assigns user input to trainingStatus
            System.out.println("Is " + name + " reserved? [true or false]");
            boolean reserved = scanner.nextBoolean(); //Assigns user input to reserved
            scanner.nextLine();
            System.out.println("What is " + name + "'s service country?");
            String inServiceCountry = scanner.nextLine(); //Assigns user input to inServiceCountry
            System.out.println("What is " + name + "'s tail length?");
            String tailLength = scanner.nextLine(); //Assigns user input to tailLength
            System.out.println("What is " + name + "'s height?");
            String height = scanner.nextLine(); //Assigns user input to height
            System.out.println("What is " + name + "'s body length?");
            String bodyLength = scanner.nextLine(); //Assigns user input to bodyLength
            System.out.println("What is " + name + "'s species?");
            String species = scanner.nextLine().toLowerCase(); //Assigns user input to species
            //This if statement confirms the monkey species is one of the ones that is accepted
            if (!species.equals("capuchin") && !species.equals("guenon") && !species.equals("macaque") 
            		&& !species.equals("marmoset") && !species.equals("squirrel monkey") && !species.equals("tamarin")) {
            	System.out.println("**" + name + " is not eligible for training**");
            	return;
            }
            //This statement adds the monkey information to monkeyList
            Monkey newMonkey = new Monkey(name, gender, age, weight, acquisitionDate, acquisitionCountry, trainingStatus,
            		reserved, inServiceCountry, tailLength, height, bodyLength, species);
            monkeyList.add(newMonkey);
        }

        // Complete reserveAnimal
        // You will need to find the animal by animal type and in service country
        public static void reserveAnimal(Scanner scanner) {
            System.out.println("Enter animal type. [Dog or Monkey]");
            String type = scanner.next().toLowerCase();
            if (!type.equals("dog") && !type.equals("monkey")) {
            	System.out.println("Invalid entry.");
            	return;
            }
            System.out.println("Enter animal service country:");
            scanner.nextLine();
            String serviceCountry = scanner.nextLine();
            
            if (type.equalsIgnoreCase("dog")) { //if loop to find and reserve a dog that is both in service and not reserved
            	for(Dog dog : dogList) {
            		if(true && dog.getTrainingStatus().equalsIgnoreCase("in service") && dog.getInServiceLocation().equalsIgnoreCase(serviceCountry)
            				&& !dog.getReserved()) {
            			dog.setReserved(true);
            			
            			System.out.println(dog.getName() + " has been reserved");
            			return;
            		}
            	}
            }
            if (type.equalsIgnoreCase("monkey")) { //If loop to find and reserve a monkey that is both in service and not reserved
            	for(Monkey monkey : monkeyList) {
            		if(true  && monkey.getTrainingStatus().equalsIgnoreCase("in service") 
            				&& monkey.getInServiceLocation().equalsIgnoreCase(serviceCountry) && !monkey.getReserved()) {
            			monkey.setReserved(true);

            			System.out.println(monkey.getName() + " has been reserved");
            			return;
            		}
            	}
            }  
            //This will print if no dog or monkey is available to be reserved
            System.out.println("Unable to reserve a " + type + " from " + serviceCountry + " at this time.");
        }

        // Complete printAnimals
        // Include the animal name, status, acquisition country and if the animal is reserved.
	// Remember that this method connects to three different menu items.
        // The printAnimals() method has three different outputs
        // based on the listType parameter
        // dog - prints the list of dogs
        // monkey - prints the list of monkeys
        // available - prints a combined list of all animals that are
        // fully trained ("in service") but not reserved 
	// Remember that you only have to fully implement ONE of these lists. 
	// The other lists can have a print statement saying "This option needs to be implemented".
	// To score "exemplary" you must correctly implement the "available" list.
        int i =0;
        public static void printAnimals(String type) {
        	//If statement that prints out all the dogs: name, training status, acquisition location, and reservation status
        	if (type.toLowerCase().equals("dog")) {
        		System.out.println("---------------------------------------------------------");
        		System.out.printf("%-10s| %-10s | %-20s | %s%n", "NAME", "STATUS", "ACQUISITION LOCATION", "RESERVED?");
        		System.out.println("---------------------------------------------------------");
        		System.out.println();
        		for (Dog dog: dogList) {
        			System.out.printf("%-10s| %-10s | %-20s | %s%n", dog.getName(), dog.getTrainingStatus(), 
        					dog.getAcquisitionLocation(), dog.getReserved());
        		}
        	}
        	else if (type.toLowerCase().equals("monkey")) {
        		//If statement that prints out all the monkeys: name, training status, acquisition location, and reservation status
        		System.out.println("---------------------------------------------------------");
        		System.out.printf("%-10s| %-10s | %-20s | %s%n", "NAME", "STATUS", "ACQUISITION LOCATION", "RESERVED?");
        		System.out.println("---------------------------------------------------------");
        		System.out.println();
        		for (Monkey monkey: monkeyList) {
        			System.out.printf("%-10s| %-10s | %-20s | %s%n", monkey.getName(), monkey.getTrainingStatus(), 
        					monkey.getAcquisitionLocation(), monkey.getReserved());
        		}
        	}
        	else if (type.toLowerCase().equals("available")) {
        		// Prints out all the animals that are available to be reserved in a given country
        	System.out.println("------------------------------------------------------------------");
    		System.out.printf("%-12s| %-10s| %-10s | %-16s | %s%n","ANIMAL TYPE", "NAME", "STATUS", "SERVICE COUNTRY", "RESERVED");
    		System.out.println("------------------------------------------------------------------");
    		System.out.println();
        		for (Dog dog: dogList) {
        			String name = dog.getName();
        			String status = dog.getTrainingStatus();
        			String serviceCountry = dog.getInServiceLocation();
        			boolean reserved = dog.getReserved();
        			
        			boolean available = !reserved && status.equalsIgnoreCase("in service");
        			if(!available) {
        				continue;
        				
        			}
        			System.out.printf("%-12s| %-10s| %-10s | %-16s | %s%n", "Dog", name, status, serviceCountry, reserved);
        		}
        		for (Monkey monkey: monkeyList) {
        			String name = monkey.getName();
        			String status = monkey.getTrainingStatus();
        			String serviceCountry = monkey.getInServiceLocation();
        			boolean reserved = monkey.getReserved();
        			
        			boolean available = !reserved && status.equalsIgnoreCase("in service");
        			if(!available) {
        				continue;
        				
        			}
        			System.out.printf("%-12s| %-10s| %-10s | %-16s | %s%n", "Monkey", name, status, serviceCountry, reserved);
        		}
        		}
        	}


        }


