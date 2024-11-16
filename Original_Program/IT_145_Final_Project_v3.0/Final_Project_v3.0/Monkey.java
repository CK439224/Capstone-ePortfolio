
public class Monkey extends RescueAnimal {

    //Instance variable
    private String tailLength;
    private String height;
    private String bodyLength;
    private String species;

    //Constructor with arguments
    public Monkey(String name, String gender, String age,
                  String weight, String acquisitionDate, String acquisitionCountry,
                  String trainingStatus, boolean reserved, String inServiceCountry, 
                  String tailLength, String height, String bodyLength, String species) {
        setName(name);
        setGender(gender);
        setAge(age);
        setWeight(weight);
        setAcquisitionDate(acquisitionDate);
        setAcquisitionLocation(acquisitionCountry);
        setTrainingStatus(trainingStatus);
        setReserved(reserved);
        setInServiceCountry(inServiceCountry);

    }

    //Constructor with defaults
    public Monkey() {
        this.tailLength = "9999"; //Sets tailLength to 9999
        this.height = "9999"; //Sets height to 9999
        this.bodyLength = "9999"; //Sets bodyLength to 9999
        this.species = "No species entered"; //Set species to No species entered
    }

    // Accessor Methods
    public String getTailLength() { //returns the tailLength
        return tailLength;
    }

    public String getHeight() { //returns the height
        return height;
    }

    public String getBodyLength() { //returns the bodyLength
        return bodyLength;
    }

    public String getSpecies() { //returns the species
        return species;
    }

    // Mutator Method
    public void setTailLength(String tailLength){ //Sets the tailLength
        this.tailLength = tailLength;
    }

    public void setHeight(String height){ //Sets the height
        this.height = height;
    }

    public void setBodyLength(String bodyLength) { //Sets the bodyLength
        this.bodyLength = bodyLength;
    }

    public void setSpecies(String species) { //Sets the species
        this.species = species;
    }

}
