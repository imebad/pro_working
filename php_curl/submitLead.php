<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {


    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $country = $_POST['country'];
    $source = $_POST['source'];
    $sub_source = $_POST['sub_source'];
    $campaign = $_POST['campaign'];
    $agent_reference = $_POST['agent_reference'];
    $type = $_POST['type'];
    $listing_reference = $_POST['listing_reference'];
    $medium = $_POST['medium'];
    $notes = $_POST['notes'];

    if (empty($name) || empty($email) || empty($mobile) || empty($country) || empty($source) || empty($sub_source) || empty($campaign)) {
        http_response_code(400); // Bad Request
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    // Prepare data for the API call
    $data = [
        'name' => $name,
        'email' => $email,
        'mobile' => $mobile,
        'country' => $country,
        'source' => $source,
        'sub_source' => $sub_source,
        'campaign' => $campaign,
        'agent_reference' => $agent_reference ? $agent_reference : '' ,
        'type' => $type ? $type : '',
        'listing_reference' => $listing_reference ? $listing_reference : '' ,
        'medium' => $medium ? $medium : '',
        'notes' => $notes ? $notes : '',
    ];

    $url = 'https://dev.rexcrm.com/leads'; // The API endpoint you are calling

    // Use cURL for the API call
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

    $response = curl_exec($ch);
    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($status_code == 200) {
        // Assuming the API returns a JSON response
        $decodedResponse = json_decode($response, true);
        // Process the response as needed
        echo "Update successful: " . htmlspecialchars($decodedResponse['message']);
    } else {
        // Handle error
        echo "Failed to update. Status code: " . htmlspecialchars($status_code);
    }
} else {
    // Not a POST request
    echo "Invalid request method.";
}
?>
