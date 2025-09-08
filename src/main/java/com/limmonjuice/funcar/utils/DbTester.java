package com.limmonjuice.funcar.utils;

import com.limmonjuice.funcar.models.Car;
import com.limmonjuice.funcar.repositories.CarRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DbTester implements CommandLineRunner {

    private final CarRepo carRepository;

    public DbTester(CarRepo carRepository) {
        this.carRepository = carRepository;
    }

    @Override
    public void run(String... args) {
        System.out.println("Starting DB Test...");


        // Create a sample car only if database is empty
        if (carRepository.count() == 0) {
            Car car = new Car();
            car.setLicensePlate("ABI-2207");
            car.setMake("Toyota");
            car.setModel("Vios");
            car.setYear(2019);
            car.setColor("Gray");
            car.setBodyType("Sedan");
            car.setEngineType("Gasoline");
            car.setTransmission("Automatic");

            carRepository.save(car);
            System.out.println("Sample car saved successfully!");
        }

        // Retrieve and print all cars
        System.out.println("Cars in database:");
        carRepository.findAll().forEach(carRow -> {
            System.out.println(
                    "ID: " + carRow.getId() +
                            " | Plate: " + carRow.getLicensePlate() +
                            " | Make: " + carRow.getMake() +
                            " | Model: " + carRow.getModel() +
                            " | Year: " + carRow.getYear() +
                            " | Color: " + carRow.getColor() +
                            " | Body: " + carRow.getBodyType() +
                            " | Engine: " + carRow.getEngineType() +
                            " | Transmission: " + carRow.getTransmission()
            );
        });

        System.out.println("DB Test Completed!");
    }
}
