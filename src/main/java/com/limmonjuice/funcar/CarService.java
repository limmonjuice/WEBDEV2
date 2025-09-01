//package com.limmonjuice.funcar;
//import org.springframework.stereotype.Service;
//
//import java.io.*;
//import java.util.ArrayList;
//import java.util.List;
//
//@Service
//public class CarService {
//
//    private static final String FILE_NAME = "cars.csv";
//
//    private List<Car> readCars() {
//        List<Car> cars = new ArrayList<>();
//        try (BufferedReader br = new BufferedReader(new FileReader(FILE_NAME))) {
//            String line;
//            while ((line = br.readLine()) != null) {
//                String[] values = line.split(",");
//                Car car = new Car();
//                car.setCarID(Long.parseLong(values[0]));
//                car.setLicensePlateNumber(values[1]);
//                car.setMake(values[2]);
//                car.setModel(values[3]);
//                car.setYear(Integer.parseInt(values[4]));
//                car.setColor(values[5]);
//                car.setBodyType(values[6]);
//                car.setEngineType(values[7]);
//                car.setTransmission(values[8]);
//                cars.add(car);
//            }
//        } catch (IOException e) {
//
//        }
//        return cars;
//    }
//
//    private void writeCars(List<Car> cars) {
//        try (BufferedWriter bw = new BufferedWriter(new FileWriter(FILE_NAME))) {
//            for (Car car : cars) {
//                String line = car.getCarID() + "," +
//                        car.getLicensePlateNumber() + "," +
//                        car.getMake() + "," +
//                        car.getModel() + "," +
//                        car.getYear() + "," +
//                        car.getColor() + "," +
//                        car.getBodyType() + "," +
//                        car.getEngineType() + "," +
//                        car.getTransmission();
//                bw.write(line);
//                bw.newLine();
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    public List<Car> getAllCars() {
//        return readCars();
//    }
//
//    public void addCar(Car car) {
//        List<Car> cars = readCars();
//
//        long newId = cars.stream()
//                .mapToLong(Car::getCarID)
//                .max()
//                .orElse(0) + 1;
//        car.setCarID(newId);
//
//        cars.add(car);
//        writeCars(cars);
//    }
//}
