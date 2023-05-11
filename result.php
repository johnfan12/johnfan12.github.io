$option1 = 0; 
$option2 = 0;

if ($_POST['vote'] == '选项1') {
    $option1++;
} else {
    $option2++; 
}

echo "选项1:" . $option1 . "<br>";
echo "选项2:" . $option2 . "<br>";
