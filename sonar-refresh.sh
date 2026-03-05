docker run \
    --rm \
    --network=host \
    -e SONAR_HOST_URL="http://localhost:9000" \
    -e SONAR_SCANNER_OPTS="-Dsonar.projectKey=JPETo-V8 -Dproject.settings=/Volumes/DATA/home/jpeto_sys_8/sonar-project.properties" \
    -e SONAR_TOKEN="sqp_371f4653eae132fbfb85af63b7a0b35fa4829030" \
    -v "/Volumes/DATA/home/jpeto_sys_8:/usr/src" \
    sonarsource/sonar-scanner-cli \
    -Dsonar.projectKey=JPETo-V8 \
    -Dsonar.sonar.projectName="JPETo Version 8" \
    -Dsonar.sonar.projectVersion=1.0 \
    -Dsonar.sonar.sourceEncoding=UTF-8
